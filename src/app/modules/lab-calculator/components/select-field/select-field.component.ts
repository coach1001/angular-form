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
    
  currentSelectedValue: any;

  constructor(
    private _esm: ErrorStateMatcher,
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  customInit() {
    this.currentSelectedValue = this.controlIn.value?.key;
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
    const option = this.controlIn['element'].options.find(option_ => option_.key === event);
    this.controlIn.setValue(option);    
  }

}
