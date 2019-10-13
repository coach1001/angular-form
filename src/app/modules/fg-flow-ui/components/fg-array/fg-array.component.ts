import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FgGroupComponent } from '../fg-group/fg-group.component';
import cloneDeep from 'lodash-es/cloneDeep';
import { takeUntil } from 'rxjs/operators';
import { FormGeneratorService } from '../../services/form-generator.service';
import * as changeCase from 'change-case';
import { FgBaseElementComponent } from '../fg-base-element/fg-base-element.component';

@Component({
  selector: 'app-fg-array',
  templateUrl: './fg-array.component.html',
  styleUrls: ['./fg-array.component.scss']
})
export class FgArrayComponent extends FgBaseElementComponent {
  
  @Input()
  controlIn: FormArray;
  
  groupKeys: Array<Array<string>>;

  constructor(
    private _formGenerator: FormGeneratorService
  ) { 
    super();
  }

  elementInit() {
    this.initKeys();
    this.parentCleared$
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => {
      if (this.controlIn['controls'].length !== 0) {
        this.controlIn['controls'] = [];
        this.initKeys();
      }
    });
    this.parentReset$
    .pipe(
      takeUntil(this.destroy$)
    ).subscribe(_ => {
      this.initKeys();
      this.reset$.next();
    });
  }

  initKeys() {
    this.groupKeys = [];
    this.controlIn.controls.forEach((rowGroup: any, rgIndex) => {
      const groupKeys = Object.keys(rowGroup.controls);
      this.groupKeys[rgIndex] = [];
      groupKeys.forEach(groupKey => {
        this.groupKeys[rgIndex].push(groupKey);
      });
    });
  }

  getComponent(controlKey: string, rowIndex: number) {
    const control = this.controlIn.controls[rowIndex]['controls'][controlKey];
    if (control instanceof FormGroup) {
      return FgGroupComponent;
    } else if(control instanceof FormArray) {
      return FgArrayComponent;
    } else {
      return this._formGenerator.getControl(control['element'].subType);
    }
  }

  getComponentInputs(controlKey: string, rowIndex) {
    const control = this.controlIn.controls[rowIndex]['controls'][controlKey];
    return {
      controlIn: control,
      parent: this.controlIn.controls[rowIndex],
      name: controlKey,
      label: changeCase.sentenceCase(controlKey),
      hint: control['element'].hint,
      parentReset$: this.reset$,
      parentCleared$: this.cleared$
    };
  }

  addRow() {
    this._formGenerator.recurseFormGroup(this.controlIn, 'TOUCH_AND_VALIDATE');
    if (this.controlIn.valid || this.controlIn.controls.length === 0) {
      this.controlIn.markAsUntouched();
      this.controlIn.controls.push(cloneDeep(this.controlIn['rowTemplate']));
      this.initKeys();  
    }
  }

  handleClearing(clear: Array<boolean>): void {
    if (clear.length > 0 && clear.every(c => c) && this.controlIn['controls'].length > 0) {
      this.controlIn['controls'] = [];
      this.initKeys();   
      this.cleared$.next();
    }
  }

}
