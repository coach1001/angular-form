import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DuiFlowService } from '../dui-flow/services/dui-flow.service';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {
  
  constructor(private _fs: DuiFlowService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._fs.currentFlowId$.next(next.queryParams.flowId);
    this._fs.setCurrentFlowAndStep(next.data.module, next.data.flow, next.data.stepName);
    return true;
  }
  
}
