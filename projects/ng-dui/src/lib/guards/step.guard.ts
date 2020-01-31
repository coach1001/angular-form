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
    
    if (next.queryParams.flowId == null) {
      const flowId = uuidv4();
      this._fs.currentFlowId$.next(flowId);
      this._rt.navigateByUrl(`${state.url}?flowId=${flowId}`);
      return false;
    } else {
      this._fs.setCurrentFlowAndStep(next.data.module, next.data.flow, next.data.stepName);  
      return true;
    } 
    
  }

}
