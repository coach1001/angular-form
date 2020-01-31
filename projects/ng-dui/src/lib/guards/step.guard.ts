import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DuiFlowService } from '../dui-flow/services/dui-flow.service';
import * as uuidv4 from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {

  constructor(
    private _fs: DuiFlowService,
    private _rt: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this._fs.currentFlowId$.next(next.queryParams.flowId);
    this._fs.setCurrentFlowAndStep(next.data.module, next.data.flow, next.data.stepName);  

    if (this._fs.currentFlow$.value != null && this._fs.currentFlow$.value.flowStarted) {
      const flowId = next.queryParams.flowId;
      if (flowId == null) {
        const newFlowId = uuidv4();    
        this._fs.currentFlowId$.next(newFlowId);
        this._rt.navigateByUrl(`${state.url}?flowId=${newFlowId}`);
        return false;
      }
    }

    return true;
  }

}
