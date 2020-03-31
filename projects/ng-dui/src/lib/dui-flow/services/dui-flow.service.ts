import { Injectable, Inject, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { DuiFormGeneratorService } from '../../dui-form/services/dui-form-generator.service';
import { DuiFormDataService } from '../../dui-form/services/dui-form-data.service';
import { NgDuiConfigService } from '../../services/ng-dui-config.service';
import { HttpClient } from '@angular/common/http';
import { TaskType } from '../../dui-form/services/dui-task.enum';
import { FormGroup } from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';

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

  public routeRegistration: Array<any> = [];

  constructor(
    private _config: NgDuiConfigService,
    private _fgs: DuiFormGeneratorService,
    private _fds: DuiFormDataService,
    private _rt: Router,
    private _hc: HttpClient
  ) {
  }

  async fetchModule(module: string): Promise<any> {
    const currentModuleDefinitions = this.moduleDefinitions$.value;
    const moduleDefintion = currentModuleDefinitions.find(value => value.module === module);
    if (!moduleDefintion) {
      const response = await this._hc.get(`${this._config.baseUrl}/${this._config.system}/${module}/definition`).toPromise();
      this.moduleDefinitions$.next([...currentModuleDefinitions, { ...response }]);
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
      .find(m => m.system === this._config.system && m.module === module)
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
      .find(m => m.system === this._config.system && m.module === module)
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


  async RunStepTasks(taskType: string, formValue: any, flowContext: any): Promise<any> {
    const currentStep = this.currentStep$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const taskPath = currentStep.taskPath;
    return await this._hc.post(`${this._config.baseUrl}/${this._config.system}/${currentModule}/${currentFlow}/run-task`, {
      data: formValue,
      context: flowContext,
      taskType,
      taskPath
    }).toPromise();
  }

  async RunStepPeriTasks(form: FormGroup) {
    const currentStep = this.currentStep$.value;
    const currentFlowId = this.currentFlowId$.value;
    const formValue = form.getRawValue();
    let flowData = cloneDeep(this._fds.getFlowData(currentFlowId));
    flowData.flowData[currentStep.modelProperty] = formValue;
    const flowDataChanges = await this.RunStepTasks(TaskType.PeriTask, flowData.flowData, flowData.flowContext);
    if (flowDataChanges != null) {
      this._fgs.setFormValue(form, flowDataChanges.data[currentStep.modelProperty], false);      
    }
  }

  async nextStep(): Promise<void> {

    let form = this._fgs.form$.value;

    const currentStepName = this.currentStepName$.value;
    const currentStep = this.currentStep$.value;
    const currentModule = this.currentFlow$.value.module;
    const currentFlow = this.currentFlow$.value.flow.flow;
    const currentFlowId = this.currentFlowId$.value;

    this._fgs.recurseFormGroup(form, 'TOUCH_AND_VALIDATE');

    if (form.valid) {
      const formValue = form.getRawValue();

      if (!this._config.production) {
        console.log(formValue);
      }

      let flowData = this._fds.getFlowData(currentFlowId);

      if (flowData == null) {
        this._fds.setStepData(currentFlowId, currentModule, currentFlow, currentStep.modelProperty, formValue, {
          flowId: currentFlowId
        });
        flowData = this._fds.getFlowData(currentFlowId);
      } else {
        this._fds.setStepData(
          currentFlowId,
          currentModule,
          currentFlow,
          currentStep.modelProperty,
          formValue,
          flowData.flowContext);
      }

      const flowDataChanges = await this.RunStepTasks(TaskType.PostTask, flowData.flowData, flowData.flowContext);

      if (flowDataChanges != null) {
        this._fds.setStepData(
          currentFlowId,
          currentModule,
          currentFlow,
          currentStep.modelProperty,
          flowDataChanges.data[currentStep.modelProperty],
          flowDataChanges.context);
      }

      const routeConfig = this.routeRegistration.find(routeReg =>
        routeReg.module === currentModule &&
        routeReg.flow === currentFlow);
      if (routeConfig == null) return;
      const currentRouteIndex = routeConfig.routes.findIndex(route => route.stepName === currentStepName);
      const nextRoute = routeConfig.routes[currentRouteIndex + 1];
      if (nextRoute == null) {
        if (currentRouteIndex === (routeConfig.routes.length - 1)) {
          return;
        } else {
          return;
        }
      } else {
        this._rt.navigate([nextRoute.absolutePath], {
          queryParamsHandling: 'merge'
        });
      }
    }
  }

  async backStep(): Promise<void> {
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
  }

}
