import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FgGroupComponent } from '../fg-group/fg-group.component';
import { FgControlComponent } from '../fg-control/fg-control.component';
import cloneDeep from 'lodash-es/cloneDeep';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGeneratorService } from '../form-generator.service';
import * as changeCase from 'change-case';

@Component({
  selector: 'app-fg-array',
  templateUrl: './fg-array.component.html',
  styleUrls: ['./fg-array.component.scss']
})
export class FgArrayComponent implements OnInit, OnDestroy {
  @Input()
  controlIn: FormArray;
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();
  @Input()
  parentReset$: Subject<void> =  new Subject<void>();
  
  groupKeys: Array<Array<string>>;
  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();

  constructor(
    private _formGenerator: FormGeneratorService
  ) { }

  ngOnInit() {
    this.initKeys();
    this.parentCleared$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      if (this.controlIn['controls'].length !== 0) {
        this.controlIn['controls'] = [];
        this.initKeys();
      }
    });
    this.parentReset$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      this.initKeys();
      this.reset$.next();
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
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

  getComponent(controlKey: string, rowIndex) {
    const control = this.controlIn.controls[rowIndex]['controls'][controlKey];
    if (control instanceof FormGroup) {
      return FgGroupComponent;
    } else if(control instanceof FormArray) {
      return FgArrayComponent;
    } else { // FormControl
      return FgControlComponent;
    }
  }

  getComponentInputs(controlKey: string, rowIndex) {
    const control = this.controlIn.controls[rowIndex]['controls'][controlKey];
    return {
      controlIn: control,
      parent: this.controlIn.controls[rowIndex],
      name: controlKey,
      label: changeCase.sentenceCase(controlKey),
      parentReset$: this.reset$
    };
  }

  addRow() {
    this._formGenerator.recurseFormGroup(this.controlIn, 'TOUCH_AND_VALIDATE');
    if (this.controlIn.valid) {
      this.controlIn.controls.push(cloneDeep(this.controlIn['rowTemplate']));
      this.initKeys();  
    }
  }
}
