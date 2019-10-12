import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementControlComponent } from '../element-control/element-control.component';
import { ElementArrayComponent } from '../element-array/element-array.component';
import * as changeCase from 'change-case';
import * as jexl from 'jexl';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGeneratorService } from '../modules/fg-flow-ui/services/form-generator.service';

@Component({
  selector: 'app-element-group',
  templateUrl: './element-group.component.html',
  styleUrls: ['./element-group.component.scss']
})
export class ElementGroupComponent implements OnInit, OnDestroy {

  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  parent: FormGroup;
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();
  @Input()
  elements: any;
  @Input()
  visibleWhen: any;
  @Input()
  clearWhen: any;
  
  isVisible = true;

  private _destroy$: Subject<void> = new Subject<void>();
  cleared$: Subject<void> = new Subject<void>();

  constructor(private _formGenerator: FormGeneratorService) { }

  ngOnInit() {
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
        if (!this._formGenerator.isEmpty(<FormGroup> this.parent.controls[this.name])) {
          this.cleared$.next();
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

  getElementInputs(element: any): any {
    return { ...element, parent: this.parent.controls[this.name], parentCleared$: this.cleared$ };
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
    if (this.clearWhen != null && !this._formGenerator.isEmpty(<FormGroup> this.parent.controls[this.name])) {
      const groupValue = this.parent.value;
      if (jexl.evalSync(this.clearWhen.expression, groupValue)) {
        this.cleared$.next();
      }
    }
  }
  
  ngOnDestroy() {
    this._destroy$.next();
    this.cleared$.next();
    this._destroy$.complete();
    this.cleared$.complete();
  }

}
