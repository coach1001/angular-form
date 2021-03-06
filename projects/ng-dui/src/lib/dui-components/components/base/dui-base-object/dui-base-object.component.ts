import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';
import * as changeCase from 'change-case';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { KeyValue } from '@angular/common';

@Component({
  template: ''
})
export class DuiBaseObjectComponent implements OnInit, OnDestroy {

  @Input()
  controlIn: FormGroup;
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
      ).subscribe(_ => {
        this.checkReactivity(this.controlIn.parent.getRawValue());
      });
    }
    this.decorators = this._fgs.decorators.filter(decorator => decorator.taskPath === this.controlIn['element'].taskPath);
  }

  elementInit() {    
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

  customInit() { }

  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }
  
  get gridStyleParent(): object {
    const gridConfig = this.controlIn['element']['gridConfig'];
    const spanConfig = gridConfig?.spanConfig;
    const trackConfig = gridConfig?.trackConfig;
    const mediaSize = this._fgs.getMediaSize();
    const gridStyle = {
      'display': 'grid',
      'grid-gap': '10px'
    }
    if (spanConfig) {

    }
    if (trackConfig && trackConfig[mediaSize]) {
      if (trackConfig[mediaSize].columns && trackConfig[mediaSize].columns !== '') {
        gridStyle['grid-template-columns'] = trackConfig[mediaSize].columns;
      }
      if (trackConfig[mediaSize].rows && trackConfig[mediaSize].rows !== '') {
        gridStyle['grid-template-rows'] = trackConfig[mediaSize].rows;
      }
    }
    return gridStyle;
  }

  gridStyleChild(controlKey: string): object {
    const control = this.controlIn.controls[controlKey];
    const gridConfig = control['element']['gridConfig'];
    const spanConfig = gridConfig?.spanConfig;
    const trackConfig = gridConfig?.trackConfig;
    const mediaSize = this._fgs.getMediaSize();
    const gridStyle = {};
    if (spanConfig && spanConfig[mediaSize]) {
      if (spanConfig[mediaSize].columns && spanConfig[mediaSize].columns !== '') {
        gridStyle['grid-column'] = `span ${spanConfig[mediaSize].columns}`;
      }
      if (spanConfig[mediaSize].rows && spanConfig[mediaSize].rows !== '') {
        gridStyle['grid-row'] = `span ${spanConfig[mediaSize].rows}`;
      }
    }
    if (trackConfig && trackConfig[mediaSize]) {
    }
    return gridStyle;
  }

  setDefaultValue() {
    if (this.controlIn['element'].defaultValue && this._fgs.isEmpty(this.controlIn)) {
      this._fgs.setFormValue(this.controlIn, this.controlIn['element'].defaultValue);
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
        this.setDefaultValue();
        this.visible = true;
      } else if (visible.length > 0 && !visible.every(v => v)) {
        this.cleared$.next();
        this.controlIn.disable({ emitEvent: false });
        this.visible = false;
      }

    }
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

  getComponentInputs(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    return {
      controlIn: control,
      parent: this.controlIn,
      modelProperty: controlKey,
      label: control['element']?.name,
      hint: control['element']?.hint,
      parentReset$: this.reset$,
      parentCleared$: this.cleared$
    };
  }

  handleClearing(clear: Array<boolean>): void {
    if (clear.length > 0 && clear.every(c => c) && this.controlIn.value != null) {
      this._fgs.setFormValue(this.controlIn, {});
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
