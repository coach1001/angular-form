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
  parent: FormGroup;
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();
  @Input()
  visibleWhen = null;
  @Input()
  clearWhen = null;

  isVisible = true;

  private _destroy$: Subject<void> =  new Subject<void>();

  constructor() { }

  ngOnChanges() {
    this.evalVisibleWhen();
    this.evalClearWhen();
    this.parentCleared$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      this.parent.controls[this.name].patchValue(null);
    });
  }

  get _label_() {
    return this.label ? this.label : changeCase.sentenceCase(this.name);
  }

  evalVisibleWhen() {
    if (this.visibleWhen != null) {
      const groupValue = this.parent.value;
      this.isVisible = jexl.evalSync(this.visibleWhen.expression, groupValue);
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
