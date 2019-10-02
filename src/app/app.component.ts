import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './form-generator.service';
import { Layout, Value, FamilyLayout, FamilyValue, MultiScreenLayout, ScreenValue } from './test-form-layout';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ElementGroupComponent } from './element-group/element-group.component';
import * as deepDiff from 'deep-diff';
import * as changeCase from 'change-case';
import { ElementControlComponent } from './element-control/element-control.component';
import { ElementArrayComponent } from './element-array/element-array.component';
import { NullTemplateVisitor } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  private _currentForm = true;

  title = 'angular-form';
  stepIndex: number;
  formDefinition: any;
  formValue: any;
  form: FormGroup;
  cleared$: Subject<void> = new Subject<void>();
  formId = Math.floor(Math.random() * 10000).toString();

  constructor(
    private _formGenerator: FormGeneratorService) {
  }

  ngOnInit(): void {

    // this.formDefinition = Layout;
    // this.formValue = Value;
    // this.formDefinition = FamilyLayout;
    // this.formValue = FamilyValue;
    this.formDefinition = MultiScreenLayout;
    this.formValue = ScreenValue;

    this.stepIndex = 0;
    this._formGenerator.buildForm(this.formDefinition.screens[this.stepIndex]);

    this._formGenerator.form$.pipe(
      filter(val => val != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.form = form;
      if (this.formValue != null) {
        this._formGenerator.setFormValue(this.form, this.formValue[this.stepIndex]);
      }
    });
  }

  get _root_() {
    return this.formDefinition.screens[this.stepIndex];
  }

  get _label_() {
    return this.formDefinition.label
      ? this.formDefinition.screens[this.stepIndex].label
      : changeCase.sentenceCase(this.formDefinition.screens[this.stepIndex].name);
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
    return { ...element, parent: this.form, parentCleared$: this.cleared$ };
  }
  onSubmit() {
    this._formGenerator.recurseFormGroup(this.form, 'TOUCH_AND_VALIDATE');
    console.log(this.form.value);
    if (this.form.valid) {
      this.next();
    }
    // const changes = deepDiff(this.formValue, this.form.getRawValue());
    // console.log(changes, this.form, this.form.getRawValue());
  }

  onReset() {
    this._formGenerator.recurseFormGroup(this.form, 'UNTOUCHED_AND_PRISTINE');
    if (this.formValue[this.stepIndex] != null) {
      this._formGenerator.setFormValue(this.form, this.formValue[this.stepIndex]);
    } else {
      this.onClear();
    }
  }

  onClear() {
    this.cleared$.next();
  }

  onSwitch() {
    if (this._currentForm) {
      this.formDefinition = Layout;
      this.formValue = Value;
    } else {
      this.formDefinition = FamilyLayout;
      this.formValue = FamilyValue;
    }
    this._currentForm = !this._currentForm;
    this.stepIndex = 0;
    this._formGenerator.buildForm(this.formDefinition.screens[this.stepIndex]);
  }

  next() {
    const steps = this.formDefinition.screens.length - 1;
    this.stepIndex += 1;
    this.stepIndex = this.stepIndex > steps ? 0 : this.stepIndex;
    this._formGenerator.buildForm(this.formDefinition.screens[this.stepIndex]);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
