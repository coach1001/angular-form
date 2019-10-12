import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { ElementControlComponent } from '../element-control/element-control.component';
import { ElementGroupComponent } from '../element-group/element-group.component';
import cloneDeep from 'lodash-es/cloneDeep';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as changeCase from 'change-case';
import * as jexl from 'jexl';
import { FormGeneratorService } from '../modules/fg-flow-ui/services/form-generator.service';

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
  parentCleared$: Subject<void> = new Subject<void>();

  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(private _formGenerator: FormGeneratorService) { }

  ngOnInit(): void {
    this.evalClearWhen();
    this.evalVisibleWhen();
    this.parent.valueChanges
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        this.evalClearWhen();
        this.evalVisibleWhen();
      });
    this.parentCleared$
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(_ => {
        if (this.parent.controls[this.name]['controls'].length !== 0) {
          this.parent.controls[this.name]['controls'] = [];
        }
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

  addRow() {
    const rowTemplate = <FormGroup>cloneDeep(this.parent.controls[this.name]['rowTemplate']);
    this.parent.controls[this.name]['controls'].push(rowTemplate); 
  }

  get _disableAddRow_() {
    this._formGenerator.recurseFormGroup(<FormArray> this.parent.controls[this.name], 'VALIDATE');
    return this.parent.controls[this.name].invalid;
  }

  get _label_() {
    return this.label ? this.label : changeCase.sentenceCase(this.name);
  }

  get _controlsLength_() {
    let iterator = [];
    const length = this.parent.controls[this.name]['controls'].length ?
      this.parent.controls[this.name]['controls'].length : 0;
    for (let i = 0; i < length; i++) {
      iterator.push(i);
    }
    return iterator;
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
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
