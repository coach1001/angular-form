import { Component } from '@angular/core';
import { DuiBaseControlComponent, DuiFormGeneratorService } from 'ng-dui';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-hidden-text-field',
  templateUrl: './hidden-text-field.component.html',
  styleUrls: ['./hidden-text-field.component.scss']
})
export class HiddenTextFieldComponent extends DuiBaseControlComponent {

  hidden = true;

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
