import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { StepGuard } from './step.guard';
import * as uuidv4 from 'uuid/v4';
import { DuiFormComponent } from '../dui-components/components/dui-form/dui-form.component';
import { DuiFlowService } from '../dui-flow/services/dui-flow.service';
import { DuiFormDataService } from '../dui-form/services/dui-form-data.service';
import { NgDuiConfigService } from '../services/ng-dui-config.service';
import { NgDuiConfig } from '../config/ng-dui.config';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {

  constructor(
    @Inject(NgDuiConfigService) private _config: NgDuiConfig,
    private _fs: DuiFlowService,
    private _fds: DuiFormDataService,
    private _rt: Router
  ) { }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    const unregisteredFlow = state['unregisteredFlow'] != null ? state['unregisteredFlow'] : false;

    if (this._fs.currentFlow$.value != null && this._fs.currentFlow$.value.flowStarted && !unregisteredFlow) {
      const flowId = next.queryParams.flowId;
      if (flowId == null) {
        this._rt.navigateByUrl(`${state.url}?flowId=${uuidv4()}`);
        return false;
      } else {
        this._fs.currentFlowId$.next(flowId);
        return true;
      }
    } else {

      const flowId = next.queryParams.flowId;
      const moduleFromRouteData = next.data.module;
      const urlSegments = <UrlSegment[]>this._rt.parseUrl(state.url).root.children['primary'].segments;

      let routePrefix = '';
      let flowFromUrl = '';
      let stepFromUrl = '';

      let foundModule = false;
      let setFlow = false;
      let setStep = false;

      urlSegments.forEach(segment => {
        if (foundModule) {
          if (setFlow) {
            setFlow = false;
            setStep = true;
            flowFromUrl = segment.path;
          } else if (setStep) {
            setStep = false;
            stepFromUrl = segment.path;
          }
        }
        if (segment.path === moduleFromRouteData && !foundModule) {
          foundModule = true;
          setFlow = true;
        } else if (!foundModule) {
          routePrefix += `${segment.path}/`;
        }
      });
      routePrefix = routePrefix.substring(0, routePrefix.length - 1);

      // Check if module registered if not get and add it to definitions
      await this._fs.fetchModule(moduleFromRouteData);

      // Check if routes registered if not create and register the routes
      const startUrl = this._fs.checkIfRouteRegistered(routePrefix, moduleFromRouteData, flowFromUrl);

      if (startUrl != null) {
        this._rt.navigateByUrl(`${startUrl}?flowId=${flowId == null ? uuidv4() : flowId}`);
      } else {
        this._fs.initFlow(moduleFromRouteData, flowFromUrl, unregisteredFlow);
        const currentFlow = this._fs.currentFlow$.value;
        if (currentFlow != null) {
          const routeConfig = this.buildRoutes(routePrefix, moduleFromRouteData, flowFromUrl, currentFlow.flow.steps, stepFromUrl);          
          this._fs.registerRoute(routePrefix, moduleFromRouteData, flowFromUrl, routeConfig.startPathForFlow, routeConfig.routes);
          if (currentFlow.flow.resumable || !this._config.production) {
            this._rt.navigateByUrl(`${routeConfig.startUrl}?flowId=${flowId == null ? uuidv4() : flowId}`);
          } else {
            this._fds.clearFlowOnNextGet$.next(true);
            this._rt.navigateByUrl(`${routeConfig.startPathForFlow}?flowId=${flowId == null ? uuidv4() : flowId}`);
          }
        }
      }
      return false;
    }
  };


  buildRoutes(routePrefix: string, moduleFromRouteData: string, flowFromUrl: string, steps: any, stepFromUrl: string): any {

    let startPathForFlow = '';
    let startUrl = '';
    let routes = [];

    const moduleMainRoute = this._rt.config.find(route => route.data && route.data.module === moduleFromRouteData);

    let flowRoute;

    if (moduleMainRoute != null) {
      moduleMainRoute.children.unshift({
        path: flowFromUrl
      });
      flowRoute = moduleMainRoute.children[0];
      flowRoute.children = [];
    } else {
      return;
    }

    steps.forEach((step, stepIndex) => {

      const stepSegment = step.name;

      if (stepIndex === 0) {
        const redirectFlowToFlowStartStep: Route = {
          path: `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}`,
          redirectTo: `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}/${stepSegment}`,
          pathMatch: 'full'
        };
        this._rt.config.unshift(redirectFlowToFlowStartStep);
        startPathForFlow = `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}`;
        if (stepFromUrl == null || stepFromUrl === '') {
          startUrl = `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}/${stepSegment}`;
        } else {
          startUrl = `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}/${stepFromUrl}`;
        }
      }

      const stepRoute: Route = {
        path: stepSegment,
        component: DuiFormComponent,
        canActivate: [StepGuard],        
        // runGuardsAndResolvers: 'always',
        data: {
          module: moduleFromRouteData,
          flow: flowFromUrl,
          stepName: step.name,
          stepIndex
        }
      }

      flowRoute.children.push(stepRoute);

      routes.push({
        moduleFromRouteData,
        flowFromUrl,
        stepIndex,
        stepName: step.name,
        absolutePath: `${routePrefix}/${moduleFromRouteData}/${flowFromUrl}/${stepSegment}`
      });

    });
    return {
      startPathForFlow,
      startUrl,
      routes
    }
  }

}
