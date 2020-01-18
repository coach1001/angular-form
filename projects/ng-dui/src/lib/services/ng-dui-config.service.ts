import { InjectionToken } from '@angular/core';
import { NgDuiConfig } from '../config/ng-dui.config';

/**
 * This is not a real service, but it looks like it from the outside.
 * It's just an InjectionTToken used to import the config object, provided from the outside
 */
export const NgDuiConfigService = new InjectionToken<NgDuiConfig>("ContentfulConfig");