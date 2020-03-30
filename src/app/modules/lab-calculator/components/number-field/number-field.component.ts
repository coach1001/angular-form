import { Component, OnInit, OnDestroy } from '@angular/core';
import { DuiBaseControlComponent, DuiFormGeneratorService } from 'ng-dui';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-field',
  templateUrl: './number-field.component.html',
  styleUrls: ['./number-field.component.scss']
})
export class NumberFieldComponent extends DuiBaseControlComponent {

  constructor(
    private _esm: ErrorStateMatcher,
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  get inputClass() {
    return {
      'form-control': true,
      'is-invalid': this._esm.isErrorState(<FormControl>this.controlIn, null)
    };
  }
  
  get error_() {
    return this._esm.isErrorState(<FormControl>this.controlIn, null) ? this.error : '';
  }

}
