import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';
import * as changeCase from 'change-case';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  template: ''
})
export class DuiBaseObjectComponent implements OnInit, OnDestroy  {
  
  @Input()
  controlIn: FormGroup;
  @Input()
  name: string;
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

  protected _destroy$: Subject<void> = new Subject<void>();
  controlKeys: Array<string> = [];

  constructor(
    private _fgs: DuiFormGeneratorService
  ) {}

  ngOnInit() {
    this.defaultInit();
    this.elementInit();
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
  }

  elementInit() {
    this.controlKeys = Object.keys(this.controlIn.controls);
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (!this._fgs.isEmpty(<FormGroup>this.controlIn)) {
          this.cleared$.next();
        }
      });
    this.parentReset$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        this.reset$.next();
      });
  }

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

  getComponent(controlKey: string) {
    /*const control = this.controlIn.controls[controlKey];
    if (control instanceof FormGroup) {
      return FgGroupComponent;
    } else if (control instanceof FormArray) {
      return FgArrayComponent;
    } else if (control instanceof FormControl) {
      return this._formGenerator.getControl(control['element'].subType);
    }*/
  }

  getComponentInputs(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    return {
      controlIn: control,
      parent: this.controlIn,
      name: controlKey,
      label: changeCase.sentenceCase(controlKey),
      hint: control['element'].hint,
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
