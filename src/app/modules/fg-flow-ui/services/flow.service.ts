import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TestModule } from '../../../test-flow';
import { FormGeneratorService } from './form-generator.service';
import { Router } from '@angular/router';
import { FormDataService } from './form-data.service';
import * as jexl from 'jexl';
import { environment } from '../../../../environments/environment';
import { FlowBackendService } from './flow-backend.service';

export interface IFlowDefinition {
  module: string,
  flow: any;
  flowStarted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  public moduleDefinitions$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public currentFlow$: BehaviorSubject<IFlowDefinition> = new BehaviorSubject(null);
  public currentStep$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentStepName$: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentFlowId$: BehaviorSubject<string> = new BehaviorSubject(null);

  public system = environment.flowsConfig.system;

  public routeRegistration: Array<any> = [];
  private readonly wait = (ms) => new Promise(res => setTimeout(res, ms));

  constructor(
    private _formGenerator: FormGeneratorService,
    private _formData: FormDataService,
    private _router: Router,
    private _flowBackend: FlowBackendService
  ) {
  }

  fetchModule(module: string): void {
    const currentModuleDefinitions = this.moduleDefinitions$.value;
    const moduleDefintion = currentModuleDefinitions.find(value => value.module === module);
    if (!moduleDefintion) {
      const newModule = TestModule;
      this.moduleDefinitions$.next([...currentModuleDefinitions, newModule]);
    }
  }

  registerRoute(module: string, flow: string, startUrl: string, routes: any) {
    this.routeRegistration.push({
      module,
      flow,
      startUrl,
      routes
    });
  }

  checkIfRouteRegistered(route: string, flow: string): string {
    const registered = this.routeRegistration
      .find(value => value.route === route && value.flow === flow);
    if (registered != null) {
      return registered.startUrl;
    } else {
      return null;
    }
  }

  setCurrentFlowAndStep(module: string, flow: string, stepName: string) {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === this.system && m.module === module)
    if (!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if (!flowDefinition) return;
    this.currentFlow$.next({ flow: flowDefinition, module: module, flowStarted: true });
    this.currentStepName$.next(stepName);
    this.currentStep$.next(this.currentFlow$.value.flow.steps.find(step => step.name === stepName));
  }

  initFlow(module: string, flow: string): void {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === this.system && m.module === module)
    if (!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if (!flowDefinition) return;
    if (!this.currentFlow$.value || !this.currentFlow$.value.flowStarted) {
      this.currentFlow$.next({ flow: flowDefinition, module: module, flowStarted: true });
      this.currentStepName$.next(this.currentFlow$.value.flow.steps[0].name);
      this.currentStep$.next(this.currentFlow$.value.flow.steps.find(step => step.name === this.currentStepName$.value));
    }
  }

  gotoStep(stepName: string): void {
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const routeConfig = this.routeRegistration.find(routeReg =>
      routeReg.module === currentModule &&
      routeReg.flow === currentFlow);
    const nextRoute = routeConfig.routes.find(route => route.stepName === stepName);
    if (nextRoute == null) return;
    this._router.navigate([nextRoute.absolutePath], {
      queryParamsHandling: 'merge'
    });
  }

  async RunServerTask() {
    const currentFlowId = this.currentFlowId$.value;
    const flowData = this._formData.getFlowData(currentFlowId)
    await this._flowBackend.runTask(flowData)
  }

  async evalActions(actions: any): Promise<boolean> {
    let continueFlow = true;
    for (const action of actions) {
      if(continueFlow) {
        switch(action.type) {
          case 'SERVER_TASK': await this.RunServerTask(); console.log('SERVER_TASK'); break;
          case 'ABSOLUTE_REDIRECT': console.log('ABSOLUTE_REDIRECT');
            this._router.navigateByUrl(action.value); continueFlow = false; break;
          default: break;          
        }
      }
    }
    return continueFlow;
  }

  triggerActions(trigger: string) {
    let continueFlow = true;
    const currentFlow = this.currentFlow$.value.flow;
    switch (trigger) {
      case 'POST_FLOW': this.evalActions(currentFlow.actions) ; break;
      default: break;
    }
    return continueFlow;
  }

  nextStep(): Promise<void> {
    const form = this._formGenerator.form$.value;
    const currentStepName = this.currentStepName$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const currentFlowId = this.currentFlowId$.value;
    this._formGenerator.recurseFormGroup(form, 'TOUCH_AND_VALIDATE');
    if (form.valid) {
      if (this.triggerActions('BEFORE_NEXT_STEP')) {
        this._formData.setStepData(currentFlowId, currentModule, currentFlow, currentStepName, form.getRawValue());
        const routeConfig = this.routeRegistration.find(routeReg =>
          routeReg.module === currentModule &&
          routeReg.flow === currentFlow);
        if (routeConfig == null) return;
        const currentRouteIndex = routeConfig.routes.findIndex(route => route.stepName === currentStepName);
        const nextRoute = routeConfig.routes[currentRouteIndex + 1];
        if (nextRoute == null) {
          if (currentRouteIndex === (routeConfig.routes.length - 1)) {
            this.triggerActions('POST_FLOW');
            return;
          } else {
            return;
          }
        } else {
          this._router.navigate([nextRoute.absolutePath], {
            queryParamsHandling: 'merge'
          });
        }
      } else {
        return;
      }
    }
  }

  async backStep(): Promise<void> {
    if (await this.triggerActions('BEFORE_BACK_STEP')) {
      const currentStepName = this.currentStepName$.value;
      const currentModule = this.currentFlow$.value.module;
      const currentFlow = this.currentFlow$.value.flow.flow;
      const routeConfig = this.routeRegistration.find(routeReg =>
        routeReg.module === currentModule &&
        routeReg.flow === currentFlow);
      if (routeConfig == null) return;
      const currentRouteIndex = routeConfig.routes.findIndex(route => route.stepName === currentStepName);
      const nextRoute = routeConfig.routes[currentRouteIndex - 1];
      if (nextRoute == null) return;
      this._router.navigate([nextRoute.absolutePath], {
        queryParamsHandling: 'merge'
      });
    } else {
      return;
    }
  }
}
