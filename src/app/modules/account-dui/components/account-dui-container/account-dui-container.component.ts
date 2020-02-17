import { Component, OnInit } from '@angular/core';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-account-dui-container',
  templateUrl: './account-dui-container.component.html',
  styleUrls: ['./account-dui-container.component.scss']
})
export class AccountDuiContainerComponent implements OnInit {

  currentStep$;

  constructor(
    private _fs: DuiFlowService
  ) { }

  ngOnInit() {
    this.currentStep$ = this._fs.currentStep$;
  }

  back(): void {
    this._fs.backStep();
  }

  next(): void {
    this._fs.nextStep();
  }

}
