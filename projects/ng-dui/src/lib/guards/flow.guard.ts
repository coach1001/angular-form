import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ModuleGuard } from './module.guard';

@Injectable({
  providedIn: 'root'
})
export class FlowGuard implements CanActivate {
  constructor(private _mg: ModuleGuard) {    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    state['unregisteredFlow'] = true;
    return this._mg.canActivate(next, state);    
  }
  
}
