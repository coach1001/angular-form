import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TestModule } from '../../../test-flow';
import { FormGeneratorService } from './form-generator.service';
import { Router } from '@angular/router';
import { FormDataService } from './form-data.service';

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
  public currentStepIndex$: BehaviorSubject<number> = new BehaviorSubject(null);
  public currentFlowId$: BehaviorSubject<string> = new BehaviorSubject(null);

  public system = 'portal';
  
  public routeRegistration: Array<any> = [];
  
  constructor(
    private _formGenerator: FormGeneratorService,
    private _formData: FormDataService,
    private _router: Router
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

  setCurrentFlowAndStep(module: string, flow: string, stepIndex: number) {
    const moduleDefinitions = this.moduleDefinitions$.value;
    const moduleDefinition = moduleDefinitions
      .find(m => m.system === this.system && m.module === module)
    if (!moduleDefinition) return;
    const flowDefinition = moduleDefinition.flows.find(f => f.flow === flow);
    if (!flowDefinition) return;
    this.currentFlow$.next({ flow: flowDefinition, module: module, flowStarted: true });
    this.currentStepIndex$.next(stepIndex);
    this.currentStep$.next(this.currentFlow$.value.flow.steps[this.currentStepIndex$.value]);
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
      this.currentStepIndex$.next(0);
      this.currentStep$.next(this.currentFlow$.value.flow.steps[this.currentStepIndex$.value]);
    }
  }

  nextStep(): void {
    const form = this._formGenerator.form$.value;
    const currentIndex = this.currentStepIndex$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const currentFlowId = this.currentFlowId$.value;
    this._formGenerator.recurseFormGroup(form, 'TOUCH_AND_VALIDATE');

    if (form.valid) {
      this._formData.setStepData(currentFlowId, currentModule, currentFlow, currentIndex, form.getRawValue());
      const routeConfig = this.routeRegistration.find(routeReg =>
        routeReg.module === currentModule &&
        routeReg.flow === currentFlow);
      if (routeConfig == null) return;
      const nextRoute = routeConfig.routes.find(route => route.stepIndex === (currentIndex + 1));
      if (nextRoute == null) return;
      this._router.navigate([nextRoute.absolutePath], {
        queryParamsHandling: 'merge'
      });
    }
  }

  backStep() {
    const currentIndex = this.currentStepIndex$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;

    const routeConfig = this.routeRegistration.find(routeReg =>
      routeReg.module === currentModule &&
      routeReg.flow === currentFlow);
    if (routeConfig == null) return;
    const nextRoute = routeConfig.routes.find(route => route.stepIndex === (currentIndex - 1));
    if (nextRoute == null) return;
    this._router.navigate([nextRoute.absolutePath], {
      queryParamsHandling: 'merge'
    });
  }
}
