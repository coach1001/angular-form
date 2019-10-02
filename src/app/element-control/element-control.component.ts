import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as changeCase from 'change-case';
import * as jexl from 'jexl';

@Component({
  selector: 'app-element-control',
  templateUrl: './element-control.component.html',
  styleUrls: ['./element-control.component.scss']
})
export class ElementControlComponent implements OnChanges, OnDestroy {
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  inputType: string;
  @Input()
  hint: string;
  @Input()
  defaultValue: any;
  @Input()
  parent: FormGroup;
  @Input()
  layout: string;
  @Input()
  parentCleared$: Subject<void> = new Subject<void>();
  @Input()
  visibleWhen = null;
  @Input()
  clearWhen = null;

  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnChanges() {
    this.evalClearWhen();
    this.evalVisibleWhen();

    if(this._defaultValue_ != null && this.parent.controls[this.name].value == null) {
      this.parent.controls[this.name].patchValue(this._defaultValue_);
    }
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (this.parent.controls[this.name].value != null) {
          this.parent.controls[this.name].patchValue(null);
        }
      });
  }

  get _label_() {
    return this.label ? this.label : changeCase.sentenceCase(this.name);
  }

  get _inputType_() {
    return this.inputType ? this.inputType : 'text';
  }

  get _hint_() {
    return this.hint ? this.hint : '';
  }

  get _defaultValue_() {
    return this.defaultValue != null ? this.defaultValue : null;
  }

  get _error_() {
    const control = this.parent.controls[this.name];
    let error = null;
    if (this.parent.controls[this.name].errors != null) {
      Object.keys(control.errors).forEach(key => {
        error = error != null ? error : {
          key: key,
          value: control.errors[key]
        }
      });
    }
    return error != null ? this.getValidationMessage(error) : '';
  }

  getValidationMessage(error) {
    switch(error.key) {
      case 'required': error = `This field is required`;break;
      case 'email': error = `Not a valid email address`;break;
      case 'min': error = `Minimum ${this._label_} is ${error.value.min}`;break;
      case 'max': error = `Maximum ${this._label_} is ${error.value.max}`;break;
      case 'mustMatch': error = `Does not match - ${changeCase.sentenceCase(error.value.value)}`;break;
      default: break;
    }
    return error;
  }

  evalVisibleWhen() {
    const prevVisible = this.isVisible;
    if (this.visibleWhen != null)  {
      const groupValue = this.parent.value;
      this.isVisible = jexl.evalSync(this.visibleWhen.expression, groupValue);
      if (this.isVisible && this.isVisible !== prevVisible) {
        this.parent.controls[this.name].markAsUntouched();
        this.parent.controls[this.name].markAsPristine();
        this.parent.controls[this.name].enable();
        if (this._defaultValue_ != null && this.parent.controls[this.name].value == null) {
          this.parent.controls[this.name].patchValue(this._defaultValue_);
        }
      } else if(!this.isVisible) {
        this.parent.controls[this.name].disable();
      }
    
    }
  }

  evalClearWhen() {
    if (this.clearWhen != null && this.parent.controls[this.name].value != null) {
      const groupValue = this.parent.value;
      if (jexl.evalSync(this.clearWhen.expression, groupValue)) {
        this.parent.controls[this.name].patchValue(null);
      }
    }
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
