import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { FlowService } from '../services/flow.service';
import * as changeCase from 'change-case';
import { FgDynamicFormComponent } from '../components/fg-dynamic-form/fg-dynamic-form.component';
import { StepGuard } from './step.guard';
import * as uuidv4 from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class ModuleGuard implements CanActivate {

  constructor(
    private _flow: FlowService,
    private _router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._flow.currentFlow$.value != null && this._flow.currentFlow$.value.flowStarted) {
      const flowId = next.queryParams.flowId;
      if(flowId == null) {
        this._router.navigateByUrl(`${state.url}?flowId=${uuidv4()}`);
//        this._router.navigate([state.url], {
//          queryParams 
//        });
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
      this._flow.fetchModule(module);

      // Check if routes registered if not create and register the routes
      const startUrl = this._flow.checkIfRouteRegistered(route, flow);
      if (startUrl != null) {
        this._router.navigateByUrl(`${startUrl}?flowId=${flowId == null ? uuidv4() : flowId}`);
      } else {
        this._flow.initFlow(module, flow);
        if(this._flow.currentFlow$.value != null) {
          const routeConfig = this.buildRoutes(route, module, flow, this._flow.currentFlow$.value.flow.steps, step);
          this._flow.registerRoute(module, flow, routeConfig.startPathForFlow, routeConfig.routes);
          this._router.navigateByUrl(`${routeConfig.startUrl}?flowId=${flowId == null ? uuidv4() : flowId}`);
        }
      }
      return false;
    }
  };


  buildRoutes(routeIn: string, module: string, flow: string, steps: any, startStep: string): any {
    let startPathForFlow = '';
    let startUrl = '';
    let routes = [];

    const moduleMainRoute = this._router.config.find(route => route.data.module === module);
    if(moduleMainRoute != null) {
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
        this._router.config.push(startRoute);
        startPathForFlow = startPathToReroute;
        startUrl = `${startPathToReroute}/${startStep}`;
      }
      const route: Route = {
        path: path,
        component: FgDynamicFormComponent,
        canActivate: [StepGuard],
        data: {
          module,
          flow,
          stepIndex
        }
      }
      moduleMainRoute.children.push(route);
      routes.push({
        module,
        flow,
        stepIndex,
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
