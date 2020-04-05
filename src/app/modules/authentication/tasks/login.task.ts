import { Injectable } from '@angular/core';
import { DuiTask } from 'projects/ng-dui/src/lib/dui-tasks/services/dui-task.model';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';
import { DuiFormDataService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginTask implements DuiTask {

  constructor(
    private _fs: DuiFlowService,
    private _fds: DuiFormDataService
  ) { }

  execute(): void {    
    const data = this._fds.getFlowData(this._fs.currentFlowId$.value);
    console.log(data);
  }

}
