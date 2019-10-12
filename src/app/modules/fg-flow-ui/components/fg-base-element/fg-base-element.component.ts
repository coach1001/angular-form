import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';

@Component({
  template: '',
  selector: 'app-fg-base-element'
})
export abstract class FgBaseElementComponent implements OnInit, OnDestroy {
  @Input()
  controlIn: FormGroup | FormArray | FormControl;
  @Input()
  name: string;
  @Input()
  parent: FormGroup;
  @Input()
  parentCleared$: Subject<void> = new Subject<void>();
  @Input()
  parentReset$: Subject<void> = new Subject<void>();

  visible = true;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();
  destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.defaultInit();
    this.elementInit();
  }

  defaultInit() {
    if (this.controlIn.parent != null) {
      this.checkReactivity(this.controlIn.parent.getRawValue());
      this.controlIn.parent.valueChanges.pipe(
        takeUntil(this.destroy$)
      ).subscribe(value => {
        this.checkReactivity(value);
        this.setDefaultValue();
      });
    }
    this.setDefaultValue();
  }

  elementInit() { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
        this.visible = true;
      } else if (visible.length > 0 && !visible.every(v => v)) {
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

}
