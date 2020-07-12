import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DuiFlowService } from '../dui-flow/services/dui-flow.service';
import { DuiFormDataService } from '../dui-form/services/dui-form-data.service';
import { uuid } from 'uuidv4';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {

  constructor(
    private _fs: DuiFlowService,
    private _fds: DuiFormDataService,
    private _rt: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {    
    if (next.queryParams.flowId == null) {
      const flowId = uuid();
      this._fs.currentFlowId$.next(flowId);      
      this._rt.navigate([`${state.url}`], {
        queryParams: {
          ...next.queryParams,
          flowId
        },
        queryParamsHandling: 'merge'
      });
      return false;
    } else {
      const flowData = this._fds.getFlowData(next.queryParams.flowId);
      if (flowData != null) {
        if (flowData.flow !== next.data.flow) {
          const flowId = uuid();
          this._fs.currentFlowId$.next(flowId);          
          this._rt.navigate([`${state.url}`], {
            queryParams: {
              ...next.queryParams,
              flowId
            },
            queryParamsHandling: 'merge'
          });
          return false;
        }
      }
      this._fs.setCurrentFlowAndStep(next.data.module, next.data.flow, next.data.stepName);
      return true;
    }
  }

}
