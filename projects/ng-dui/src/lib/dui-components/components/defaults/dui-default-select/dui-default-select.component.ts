import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  selector: 'dui-default-select',
  templateUrl: './dui-default-select.component.html',
  styleUrls: ['./dui-default-select.component.scss']
})
export class DuiDefaultSelectComponent extends DuiBaseControlComponent {

  inputModel: any;
  skipNextBlur = false;
  currentSelectedValue: any;

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _crs_: DuiComponentsRegistryService) {
    super(_fgs_, _crs_);
  }
  
  get displayFn(): (value?: any) => string | undefined {
    return (value?: any): string | undefined => {
      const option = this.controlIn['element'].options.find(option_ => option_.value === value);
      if (option == null) return undefined;
      return option.displayValue;
    }
  }

  optionSelected(event: MatAutocompleteSelectedEvent): void {
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

