import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FlowService } from '../services/flow.service';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {
  
  constructor(private _flow: FlowService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this._flow.currentFlowId$.next(next.queryParams.flowId);
    this._flow.setCurrentFlowAndStep(next.data.module, next.data.flow, next.data.stepName);
    return true;
  }
  
}
