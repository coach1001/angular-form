import { NgModule } from '@angular/core';
import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { TokenStorageService } from './services/token-storage.service';
import { AuthenticationService } from './services/authentication.service';
import { DuiTaskRegistryService, NgDuiModule } from 'projects/ng-dui/src/public-api';
import { LoginTask } from './tasks/login.task';

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [
    AuthModule,    
  ],
  providers: [
    TokenStorageService,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/flow/account/user-login' },
    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService],
      useFactory: factory
    },
    LoginTask
  ]
})
export class AuthenticationModule {
  constructor(
    private _trs: DuiTaskRegistryService) {        
    _trs.addTask('login', LoginTask);
  }
}