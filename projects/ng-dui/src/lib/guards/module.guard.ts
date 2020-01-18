import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import * as changeCase from 'change-case';
import { StepGuard } from './step.guard';
import * as uuidv4 from 'uuid/v4';
import { DuiFormComponent } from '../dui-components/components/dui-form/dui-form.component';
import { DuiFlowService } from '../dui-flow/services/dui-flow.service';
import { DuiFormDataService } from '../dui-form/services/dui-form-data.service';
import { NgDuiConfigService } from '../services/ng-dui-config.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {

  constructor(
    @Inject(NgDuiConfigService) private _config,
    private _fs: DuiFlowService,
    private _fds: DuiFormDataService,
    private _rt: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._fs.currentFlow$.value != null && this._fs.currentFlow$.value.flowStarted) {
      const flowId = next.queryParams.flowId;
      if (flowId == null) {
        this._rt.navigateByUrl(`${state.url}?flowId=${uuidv4()}`);
        return false;
      } else {
        return true;
      }
    } else {
      const flowId = next.queryParams.flowId;
      const module = next.data.module;
      const urlSegments = state.url.split('/');
      urlSegments.shift();
      const route = next.url[0].path;
      const flow = urlSegments[1];
      const step = urlSegments[2];

      // Check if module registered if not get and add it to definitions
      this._fs.fetchModule(module);

      // Check if routes registered if not create and register the routes
      const startUrl = this._fs.checkIfRouteRegistered(route, flow);
      if (startUrl != null) {
        this._rt.navigateByUrl(`${startUrl}?flowId=${flowId == null ? uuidv4() : flowId}`);
      } else {
        this._fs.initFlow(module, flow);
        const currentFlow = this._fs.currentFlow$.value;
        if (currentFlow != null) {
          const routeConfig = this.buildRoutes(route, module, flow, currentFlow.flow.steps, step);
          this._fs.registerRoute(module, flow, routeConfig.startPathForFlow, routeConfig.routes);
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


  buildRoutes(routeIn: string, module: string, flow: string, steps: any, startStep: string): any {
    let startPathForFlow = '';
    let startUrl = '';
    let routes = [];

    const moduleMainRoute = this._rt.config.find(route => route.data.module === module);
    if (moduleMainRoute != null) {
      moduleMainRoute.children = [];
    } else {
      return;
    }
    steps.forEach((step, stepIndex) => {
      const path = `${changeCase.kebab(flow)}/${changeCase.kebab(step.name)}`;
      if (stepIndex === 0) {
        const startPathToReroute = `${routeIn}/${changeCase.kebab(flow)}`;
        const startRoute: Route = {
          path: startPathToReroute,
          redirectTo: `/${routeIn}/${path}`
        }
        this._rt.config.push(startRoute);
        startPathForFlow = startPathToReroute;
        startUrl = `${startPathToReroute}/${startStep}`;
      }
      const route: Route = {
        path: path,
        component: DuiFormComponent,
        canActivate: [StepGuard],
        data: {
          module,
          flow,
          stepName: step.name,
          stepIndex
        }
      }
      moduleMainRoute.children.push(route);
      routes.push({
        module,
        flow,
        stepIndex,
        stepName: step.name,
        absolutePath: `/${routeIn}/${path}`
      })
    });
    return {
      startPathForFlow,
      startUrl,
      routes
    }
  }
}
