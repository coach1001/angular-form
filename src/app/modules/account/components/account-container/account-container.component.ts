import { Component } from '@angular/core';
import { FlowService } from 'src/app/modules/fg-flow-ui/services/flow.service';

@Component({
  selector: 'app-account-container',
  templateUrl: './account-container.component.html',
  styleUrls: ['./account-container.component.scss']
})
export class AccountContainerComponent {

  constructor(
    private _flow: FlowService
  ) { }

  back(): void {
    this._flow.backStep();
  }

  next(): void {
    this._flow.nextStep();
  }

}
