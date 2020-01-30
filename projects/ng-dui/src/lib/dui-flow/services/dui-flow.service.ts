import { Injectable, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DuiFormGeneratorService } from '../../dui-form/services/dui-form-generator.service';
import { DuiFormDataService } from '../../dui-form/services/dui-form-data.service';
import { DuiFlowBackendService } from './dui-flow-backend.service';
// import { TestModule } from '../test-flow.spec';
import { TestModule } from '../validation-test-flow.spec';
import { NgDuiConfigService } from '../../services/ng-dui-config.service';

export interface IFlowDefinition {
  module: string,
  flow: any;
  flowStarted: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DuiFlowService {

  public moduleDefinitions$: BehaviorSubject<Array<any>> = new BehaviorSubject([]);
  public currentFlow$: BehaviorSubject<IFlowDefinition> = new BehaviorSubject(null);
  public currentStep$: BehaviorSubject<any> = new BehaviorSubject(null);
  public currentStepName$: BehaviorSubject<string> = new BehaviorSubject(null);
  public currentFlowId$: BehaviorSubject<string> = new BehaviorSubject(null);

  public system: string;

  public routeRegistration: Array<any> = [];
  private readonly wait = (ms) => new Promise(res => setTimeout(res, ms));

  constructor(
    @Inject(NgDuiConfigService) private _config,
    private _fgs: DuiFormGeneratorService,
    private _fds: DuiFormDataService,
    private _rt: Router,
    private _fbs: DuiFlowBackendService
  ) {
    this.system = _config.flowConfigSystem;
  }

  fetchModule(module: string): void {
    const currentModuleDefinitions = this.moduleDefinitions$.value;
    const moduleDefintion = currentModuleDefinitions.find(value => value.module === module);
    if (!moduleDefintion) {
      const newModule = TestModule;
      this.moduleDefinitions$.next([...currentModuleDefinitions, newModule]);
    }
  }

  registerRoute(routePrefix: string, module: string, flow: string, startUrl: string, routes: any) {
    this.routeRegistration.push({
      routePrefix,
      module,
      flow,
      startUrl,
      routes
    });
  }

  checkIfRouteRegistered(routePrefix: string, moduleFromUrl: string, flowFromUrl: string): string {
    const registered = this.routeRegistration
      .find(value => value.module === moduleFromUrl && value.routePrefix === routePrefix && value.flow === flowFromUrl);
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

  initFlow(module: string, flow: string, unregisteredFlow: boolean): void {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === this.system && m.module === module)
    if (!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if (!flowDefinition) return;
    if (!this.currentFlow$.value || !this.currentFlow$.value.flowStarted || unregisteredFlow) {
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
    this._rt.navigate([nextRoute.absolutePath], {
      queryParamsHandling: 'merge'
    });
  }

  async RunServerTask() {
    const currentFlowId = this.currentFlowId$.value;
    const flowData = this._fds.getFlowData(currentFlowId)
    await this._fbs.runTask(flowData)
  }

  async evalActions(actions: any): Promise<boolean> {
    let continueFlow = true;
    for (const action of actions) {
      if (continueFlow) {
        switch (action.type) {
          case 'SERVER_TASK': await this.RunServerTask(); console.log('SERVER_TASK'); break;
          case 'ABSOLUTE_REDIRECT': console.log('ABSOLUTE_REDIRECT');
            this._rt.navigateByUrl(action.value); continueFlow = false; break;
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
      case 'POST_FLOW': this.evalActions(currentFlow.actions); break;
      default: break;
    }
    return continueFlow;
  }

  nextStep(): Promise<void> {
    const form = this._fgs.form$.value;
    const currentStepName = this.currentStepName$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const currentFlowId = this.currentFlowId$.value;
    this._fgs.recurseFormGroup(form, 'TOUCH_AND_VALIDATE');
    if (form.valid) {
      if (this.triggerActions('BEFORE_NEXT_STEP')) {
        this._fds.setStepData(currentFlowId, currentModule, currentFlow, currentStepName, form.getRawValue());
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
          this._rt.navigate([nextRoute.absolutePath], {
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
      this._rt.navigate([nextRoute.absolutePath], {
        queryParamsHandling: 'merge'
      });
    } else {
      return;
    }
  }

}
