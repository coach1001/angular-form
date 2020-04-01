import { Component } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
// import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseControlComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-control/dui-base-control.component';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends DuiBaseControlComponent {

  inputModel: any;
  skipNextBlur = false;
  currentSelectedValue: any;

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
  
  get displayFn(): (value?: any) => string | undefined {
    return (value?: any): string | undefined => {
      if(value != null) {
        const option = this.controlIn['element'].options.find(option_ => option_.key === value.key);
        if (option == null) return undefined;
        return option.display;
      }      
    }
  }

  optionSelected(event: any): void {
    this.controlIn.setValue(event.option.value);
    this.skipNextBlur = true;
  }

  sanitizeInput(event): void {
    if (this.skipNextBlur) {
      this.skipNextBlur = false;
      return;
    }
    const options = this.controlIn['element'].options;
    const controlValue = this.controlIn.value;
    const eventValue = event.target.value;
    const validValue = options.find(option => option.value === controlValue && option.displayValue === eventValue);
    if (validValue != null) return;
    if (options == null || controlValue == null) {
      this.controlIn.setValue(null);
      return;
    }
    const option = options.find(option_ => option_.displayValue === controlValue);
    if (option == null) {
      this.controlIn.setValue(null);
      return;
    }
    this.controlIn.setValue(option.value);
  }

}
