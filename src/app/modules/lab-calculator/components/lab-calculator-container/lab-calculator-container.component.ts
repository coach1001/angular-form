import { Component, OnInit } from '@angular/core';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';

@Component({
  selector: 'app-lab-calculator-container',
  templateUrl: './lab-calculator-container.component.html',
  styleUrls: ['./lab-calculator-container.component.scss']
})
export class LabCalculatorContainerComponent implements OnInit {

  currentStep$;

  constructor(
    private _fs: DuiFlowService
  ) { }

  ngOnInit() {
    this.currentStep$ = this._fs.currentStep$;
  }

  async back() {
    await this._fs.backStep();
  }

  async next() {
    await this._fs.nextStep();
  }

}
