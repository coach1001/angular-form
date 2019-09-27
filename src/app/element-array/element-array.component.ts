import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementControlComponent } from '../element-control/element-control.component';
import { ElementGroupComponent } from '../element-group/element-group.component';
import cloneDeep from 'lodash-es/cloneDeep';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as changeCase from 'change-case';
import { FormGeneratorService } from '../form-generator.service';
import * as jexl from 'jexl';

@Component({
  selector: 'app-element-array',
  templateUrl: './element-array.component.html',
  styleUrls: ['./element-array.component.scss']
})
export class ElementArrayComponent implements OnInit, OnDestroy {

  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  parent: FormGroup;
  @Input()
  elements: any;
  @Input()
  visibleWhen: any;
  @Input()
  clearWhen: any;

  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();

  iterator: Array<number> = null;
  origArrayValue: Array<any> = [];
  origArrayLength: number;

  constructor(private _formGenerator: FormGeneratorService) { }

  ngOnInit(): void {

    this.evalVisibleWhen();
    this.evalClearWhen();

    this.iterator = [];
    this.origArrayValue = cloneDeep(this.parent.controls[this.name].value);
    this.origArrayLength = this.origArrayValue.length ? this.origArrayValue.length : 0;

    for (let i = 0; i < this.origArrayLength; i++) {
      this.iterator.push(i);
    }

    this._formGenerator.resetForm$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      this.iterator = [];
      this.parent.controls[this.name]['controls'] = [];
      for (let i = 0; i < this.origArrayLength; i++) {        
        const rowTemplate = <FormGroup>cloneDeep(this.parent.controls[this.name]['rowTemplate']);
        this.parent.controls[this.name]['controls'].push(rowTemplate);
        this.parent.controls[this.name]['controls'][i].patchValue(this.origArrayValue[i]);
        this.iterator.push(i);
      }
      this.evalVisibleWhen();
      this.evalClearWhen();
    });

    this.parent.valueChanges
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        this.evalVisibleWhen();
        this.evalClearWhen();
      });
  }

  getElementComponent(type: string): any {
    if (type === 'CONTROL') {
      return ElementControlComponent;
    } else if (type === 'OBJECT') {
      return ElementGroupComponent;
    } else if (type === 'ARRAY') {
      return ElementArrayComponent;
    }
    return null;
  }

  getElementInputs(element: any, index: number): any {
    return { ...element, parent: this.parent.controls[this.name]['controls'][index] };
  }

  createRow() {
    const rowTemplate = <FormGroup>cloneDeep(this.parent.controls[this.name]['rowTemplate']);
    this.parent.controls[this.name]['controls'].push(rowTemplate);
    this.iterator.push(this.iterator[this.iterator.length - 1] + 1);
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
    if (this.clearWhen != null && this.parent.controls[this.name]['controls'].length !== 0) {
      const groupValue = this.parent.value;
      if (jexl.evalSync(this.clearWhen.expression, groupValue)) {
        this.parent.controls[this.name]['controls'] = [];
        this.iterator = [];
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
