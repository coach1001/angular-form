import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as jexl from 'jexl';

@Component({
  selector: 'app-fg-control',
  templateUrl: './fg-control.component.html',
  styleUrls: ['./fg-control.component.scss']
})
export class FgControlComponent implements OnInit, OnDestroy {

  @Input()
  name: string;
  @Input()
  controlIn: FormControl;
  @Input()
  parentCleared$: Subject<void> = new Subject<void>();

  visible = true;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();

  private _destroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit() {
    this.checkReactivity(this.controlIn.parent.getRawValue());
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (this.controlIn.value != null) {
          this.controlIn.patchValue(null);
        }
      });
    this.controlIn.parent.valueChanges.pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.checkReactivity(value);
    })
  }

  ngOnDestroy() {
    throw new Error("Method not implemented.");
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
    return error != null ? this.getValidationMessage(error) : '';
  }

  getValidationMessage(error) {
    switch (error.key) {
      case 'required': error = `This field is required`; break;
      case 'email': error = `Not a valid email address`; break;
      case 'min': error = `Minimum is ${error.value.min}`; break;
      case 'max': error = `Maximum is ${error.value.max}`; break;
      case 'mustMatch': error = `Does not match - ${error.value.value}`; break;
      default: break;
    }
    return error;
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

      if (clear.length > 0 && clear.every(d => d) && this.controlIn.value != null) {
        this.controlIn.patchValue(null, { emitEvent: false });
        this.cleared$.next();
      }

      if (disable.length > 0 && disable.every(d => d) && !this.controlIn.disabled) {
        this.controlIn.disable({ emitEvent: false });
      } else if (disable.length > 0 && !disable.every(d => d) ) {
        this.controlIn.enable({ emitEvent: false });
      }

      
    }
  }
}
