import { Injectable } from '@angular/core';
import { DuiTask } from 'projects/ng-dui/src/lib/dui-tasks/services/dui-task.model';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';
import { DuiFormDataService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-data.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { DuiFlowBackendService } from 'ng-dui/ng-dui';

@Injectable({
  providedIn: 'root'
})
export class LoginTask implements DuiTask {

  constructor(
    private _fs: DuiFlowService,
    private _fds: DuiFormDataService,
    private _as: AuthenticationService,
    private _rt: Router,
  ) { }

  execute(): void {    
    const data = this._fds.getFlowData(this._fs.currentFlowId$.value);
    if(data.flowContext?.dbUser != null) {
      const dbUser = data.flowContext?.dbUser;
      this._as.saveAccessData({accessToken: dbUser.token, refreshToken: null, roles: dbUser.roles});
      this._rt.navigateByUrl('/');
    } else if(data.flowContext?.ldapUser != null) {
      const ldapUser = data.flowContext?.ldapUser;
      this._as.saveAccessData({accessToken: ldapUser.token, refreshToken: null, roles: ldapUser.roles});
      this._rt.navigateByUrl('/');
    }
  }
}
