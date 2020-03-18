import { Component, OnInit, Input, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  template: ''
})
export class DuiBaseControlComponent implements OnInit, OnDestroy {
  
  @Input()
  controlIn: FormGroup | FormArray | FormControl;
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
  @Input()
  hideLabel: boolean;

  visible = true;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();

  protected _destroy$: Subject<void> = new Subject<void>();
  private _gridStyle: object = {};

  constructor(
    private _fgs: DuiFormGeneratorService
  ) {
  }

  ngOnInit() {
    this.defaultInit();
    this.elementInit();
    this.gridConfig();
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
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (this.controlIn.value != null) {
          this.controlIn.patchValue(null);
        }
      });
  }

  gridConfig() {
    const gridConfig = this.controlIn['element']['gridConfig'];
    const spanConfig = gridConfig?.spanConfig;
    const trackConfig = gridConfig?.trackConfig;
    const mediaSize = this._fgs.getMediaSize();

    this._gridStyle = {
      width: '100%'
    };

    if (spanConfig && spanConfig[mediaSize]) {
      if (spanConfig[mediaSize].columns && spanConfig[mediaSize].columns !== '') {
        this._gridStyle['grid-template-columns'] = spanConfig[mediaSize].columns;
      }
      if (spanConfig[mediaSize].rows && spanConfig[mediaSize].rows !== '') {
        this._gridStyle['grid-template-rows'] = spanConfig[mediaSize].rows;
      }
    }
    if (trackConfig && trackConfig[mediaSize]) {
    }
    console.log(this._gridStyle);
  }

  get gridStyle() {
    return this._gridStyle;
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

  handleClearing(clear: Array<boolean>) {
    if (clear.length > 0 && clear.every(c => c) && this.controlIn.value != null) {
      this.controlIn.patchValue(null, { emitEvent: false });
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
