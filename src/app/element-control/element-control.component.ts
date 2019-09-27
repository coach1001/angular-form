import { Component, Input, OnChanges } from '@angular/core';
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
export class ElementControlComponent implements OnChanges {
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  parent: FormGroup;
  @Input()
  visibleWhen = null;
  @Input()
  clearWhen = null;

  isVisible = true;

  constructor() { }

  ngOnChanges() {
    this.evalVisibleWhen();
    this.evalClearWhen();
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

}
