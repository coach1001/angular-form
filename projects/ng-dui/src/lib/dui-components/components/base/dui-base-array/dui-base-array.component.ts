import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';
import * as changeCase from 'change-case';
import cloneDeep from 'lodash-es/cloneDeep';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  template: ''
})
export class DuiBaseArrayComponent implements OnInit, OnDestroy {

  @Input()
  controlIn: FormArray;
  @Input()
  modelProperty: string;
  @Input()
  label: string;
  @Input()
  parent: FormGroup;
  @Input()
  parentCleared$: Subject<void> = new Subject<void>();
  @Input()
  parentReset$: Subject<void> = new Subject<void>();

  visible = true;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();
  decorators: Array<any>;

  protected _destroy$: Subject<void> = new Subject<void>();

  groupKeys: Array<Array<string>>;

  constructor(
    private _fgs: DuiFormGeneratorService
  ) { }

  ngOnInit() {
    this.defaultInit();
    this.elementInit();
    this.customInit();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  defaultInit() {
    this.setDefaultValue();
    if (this.controlIn.parent != null) {
      this.checkReactivity(this.controlIn.parent.getRawValue());
      this.controlIn.parent.valueChanges.pipe(
        takeUntil(this._destroy$)
      ).subscribe(value => {
        this.setDefaultValue();
        this.checkReactivity(value);
      });
    }
    this.decorators = this._fgs.decorators.filter(decorator => decorator.taskPath === this.controlIn['element'].taskPath);
  }

  elementInit() {
    this.initKeys();
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (this.controlIn['controls'].length !== 0) {
          this.controlIn.clear();
          this.cleared$.next();
          this.initKeys();
        }
      });
    this.parentReset$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        this.reset$.next();
        this.initKeys();
      });
  }

  customInit() { }

  setDefaultValue() {
    if (this.controlIn['element'].defaultValue && this.controlIn.value == null) {
      this.controlIn.patchValue(this.controlIn['element'].defaultValue, { emitEvent: false });
    }
  }

  checkReactivity(scopeValue) {

    const visible: Array<boolean> = [];
    const disable: Array<boolean> = [];
    const clear: Array<boolean> = [];

    if (this.controlIn['element'].reactivity) {
      this.controlIn['element'].reactivity.forEach(r => {
        const result = jexl.evalSync(r.expression, scopeValue);
        switch (r.type) {
          case 'clearWhen': result ? clear.push(true) : clear.push(false); break;
          case 'disableWhen': result ? disable.push(true) : disable.push(false); break;
          case 'visibleWhen': result ? visible.push(true) : visible.push(false); break;
          default: break;
        }
      });

      this.handleClearing(clear);

      if (disable.length > 0 && disable.every(d => d) && !this.controlIn.disabled) {
        this.controlIn.disable({ emitEvent: false });
      } else if (disable.length > 0 && !disable.every(d => d)) {
        this.controlIn.markAsUntouched();
        this.controlIn.markAsPristine();
        this.controlIn.enable({ emitEvent: false });
      }

      if (visible.length > 0 && visible.every(v => v) && !this.visible) {
        this.controlIn.markAsUntouched();
        this.controlIn.markAsPristine();
        this.controlIn.enable({ emitEvent: false });
        this.visible = true;
      } else if (visible.length > 0 && !visible.every(v => v)) {
        this.cleared$.next();
        this.controlIn.disable({ emitEvent: false });
        this.visible = false;
      }

    }
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

  getDecoratorInputs(decoratorIndex: number) {
    const decorator = this.decorators[decoratorIndex];
    return {
      controlIn: decorator,
      parent: this.controlIn,
      modelProperty: null,
      label: decorator.name,
      hint: decorator.hint,
      parentReset$: this.reset$,
      parentCleared$: this.cleared$,
    };
  }

  getComponentInputs(controlKey: string, rowIndex) {
    const control = this.controlIn.controls[rowIndex]['controls'][controlKey];
    return {
      controlIn: control,
      parent: this.controlIn?.controls[rowIndex],
      modelProperty: controlKey,
      // label: control['element']?.name ? control['element'].name : changeCase.sentenceCase(controlKey),
      label: control['element'].name,
      hint: control['element']?.hint,
      parentReset$: this.reset$,
      parentCleared$: this.cleared$
    };
  }

  handleClearing(clear: Array<boolean>): void {
    if (clear.length > 0 && clear.every(c => c) && this.controlIn['controls'].length > 0) {
      this.controlIn.clear();
      this.cleared$.next();
      this.initKeys();
    }
  }

  addRow() {
    this._fgs.recurseFormGroup(this.controlIn, 'TOUCH_AND_VALIDATE');
    if (this.controlIn.valid || this.controlIn.controls.length === 0) {
      this.controlIn.markAsUntouched();
      this.controlIn.controls.push(cloneDeep(this.controlIn['rowTemplate']));
      this.controlIn.updateValueAndValidity({ onlySelf: true, emitEvent: false });
      this.initKeys();
    }
  }

  deleteRow(gIndex: number) {
    this.controlIn.controls.splice(gIndex, 1);
    this.controlIn.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    this.initKeys();
  }

  get error() {
    let error = null;
    if (this.controlIn.errors != null) {
      Object.keys(this.controlIn.errors).forEach(key => {
        error = error != null ? error : {
          key: key,
          value: this.controlIn.errors[key]
        }
      });
    }
    return error != null ? this._fgs.getErrorValidationMessage(error) : '';
  }

}
