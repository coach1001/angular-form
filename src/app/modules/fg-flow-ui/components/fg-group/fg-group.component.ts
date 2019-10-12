import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FgArrayComponent } from '../fg-array/fg-array.component';
import { FgControlComponent } from '../fg-control/fg-control.component';
import { takeUntil } from 'rxjs/operators';
import { FormGeneratorService } from '../../services/form-generator.service';
import * as changeCase from 'change-case';
import { FgBaseElementComponent } from '../fg-base-element/fg-base-element.component';

@Component({
  selector: 'app-fg-group',
  templateUrl: './fg-group.component.html',
  styleUrls: ['./fg-group.component.scss']
})
export class FgGroupComponent extends FgBaseElementComponent {
  @Input()
  controlIn: FormGroup;

  controlKeys: Array<string> = [];

  constructor(
    private _formGenerator: FormGeneratorService
  ) {
    super();
  }

  elementInit() {
    this.controlKeys = Object.keys(this.controlIn.controls);
    this.parentCleared$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        if (!this._formGenerator.isEmpty(<FormGroup>this.controlIn)) {
          this.cleared$.next();
        }
      });
    this.parentReset$
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe(_ => {
        this.reset$.next();
      });
  }

  getComponent(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    if (control instanceof FormGroup) {
      return FgGroupComponent;
    } else if (control instanceof FormArray) {
      return FgArrayComponent;
    } else { // FormControl
      return FgControlComponent;
    }
  }

  getComponentInputs(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    return {
      controlIn: control,
      parent: this.controlIn,
      name: controlKey,
      label: changeCase.sentenceCase(controlKey),
      parentReset$: this.reset$,
      parentCleared$: this.cleared$
    };
  }

  handleClearing(clear: Array<boolean>): void {
    if (clear.length > 0 && clear.every(c => c) && this.controlIn.value != null) {
      this.controlIn.patchValue({}, { emitEvent: false });     
      this.cleared$.next();
    }
  }
  
}
