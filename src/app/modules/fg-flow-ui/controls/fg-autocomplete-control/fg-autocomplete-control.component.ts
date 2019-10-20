import { Component, Input, OnInit } from '@angular/core';
import { FgBaseElementComponent } from '../../components/fg-base-element/fg-base-element.component';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-fg-autocomplete-control',
  templateUrl: './fg-autocomplete-control.component.html',
  styleUrls: ['./fg-autocomplete-control.component.scss']
})
export class FgAutocompleteControlComponent extends FgBaseElementComponent {

  @Input()
  controlIn: FormControl;

  inputModel: any;
  skipNextBlur = false;
  currentSelectedValue: any;

  constructor() {
    super();
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

    const validValue = options.find(option => option.value === controlValue && option.displayValue === eventValue );
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
