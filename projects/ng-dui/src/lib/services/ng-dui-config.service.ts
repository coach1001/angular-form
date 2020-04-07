import { Injectable, Type } from '@angular/core';
import { AuthenticationGuard } from '../guards/authentication.guard';
import { RoleGuard } from '../guards/role.guard';
import { CanActivate } from '@angular/router';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
@Injectable({
  providedIn: 'root'
})
export class NgDuiConfigService {
  system = '';
  baseUrl = '';
  production = false;  
  mediaMedium = 767; 
  mediaLarge = 997;
  authenticationGuard?: Type<AuthenticationGuard>;
  roleGuard?: Type<RoleGuard>;
}
