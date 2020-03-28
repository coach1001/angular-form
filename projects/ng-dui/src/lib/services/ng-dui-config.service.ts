import { Injectable } from '@angular/core';

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
}
