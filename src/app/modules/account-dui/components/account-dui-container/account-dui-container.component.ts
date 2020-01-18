import { Component } from '@angular/core';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';

@Component({
  selector: 'app-account-dui-container',
  templateUrl: './account-dui-container.component.html',
  styleUrls: ['./account-dui-container.component.scss']
})
export class AccountDuiContainerComponent {

  constructor(
    private _fs: DuiFlowService
  ) { }

  back(): void {
    this._fs.backStep();
  }

  next(): void {
    this._fs.nextStep();
  }

}
