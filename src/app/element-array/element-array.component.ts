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
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();

  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();

  iterator: Array<number> = null;
  origArrayValue: Array<any> = [];
  origArrayLength: number;

  constructor(private _formGenerator: FormGeneratorService) { }

  ngOnInit(): void {
    
    this.evalClearWhen();
    this.evalVisibleWhen();

    this.iterator = [];

    const valueLength = this.parent.controls[this.name].value ?
      this.parent.controls[this.name].value.length : 0;

    for (let i = 0; i < valueLength; i++) {
      this.iterator.push(i);
    }

    this._formGenerator.resetForm$.pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      this.iterator = [];
      this.parent.controls[this.name]['controls'] = [];
      if (this.parent.controls[this.name]['originalValue'] != null) {
        for (let i = 0; i < this.parent.controls[this.name]['originalValue'].length; i++) {
          const rowTemplate = <FormGroup>cloneDeep(this.parent.controls[this.name]['rowTemplate']);
          this.parent.controls[this.name]['controls'].push(rowTemplate);
          this.parent.controls[this.name]['controls'][i].patchValue(
            this.parent.controls[this.name]['originalValue'][i]
          );
          this.iterator.push(i);
        }
      }
      this.evalClearWhen();
      this.evalVisibleWhen();
    });

    this.parent.valueChanges
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(value => {
        this.evalClearWhen();
        this.evalVisibleWhen();
      });
    
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        this.parent.controls[this.name]['controls'] = [];
        this.iterator = [];
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
