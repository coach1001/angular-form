import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
// import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseControlComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-control/dui-base-control.component';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends DuiBaseControlComponent {

  groupStyle: any;

  constructor(
    private _esm: ErrorStateMatcher,
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  get inputClass() {
    return {
      'form-control-sm': true,
      'is-invalid': this._esm.isErrorState(<FormControl>this.controlIn, null)
    };
  }
  
  get error_() {
    return this._esm.isErrorState(<FormControl>this.controlIn, null) ? this.error : '';
  }

  customInit() {
    let columns = '';
    if(this.prefix?.visible && this.suffix?.visible) {
      columns = 'auto 1fr auto';
    } else if (this.prefix?.visible) {
      columns = 'auto 1fr';
    } else if (this.suffix?.visible) {
      columns = '1fr auto';
    } else {
      columns = '1fr'
    }
    this.groupStyle = {
      display: 'grid',
      'grid-template-rows': '1fr',
      'grid-template-columns': columns
    };
  }

}
