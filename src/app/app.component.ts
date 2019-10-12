import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './modules/fg-flow-ui/services/form-generator.service';
import {
  NestedScreenLayoutValue, NestedScreenLayout,
  Layout, Value, 
  FamilyLayout, FamilyValue, 
  MultiScreenLayout, ScreenValue, 
  ReactiveLayoutTest, ReactiveLayoutTestValue
} from './test-form-layout';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  title = 'angular-form';
  stepIndex: number;
  formDefinition: any;
  formValue: any;
  form: FormGroup;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();
  formId = Math.floor(Math.random() * 10000).toString();

  constructor(
    private _formGenerator: FormGeneratorService) {
  }

  ngOnInit(): void {

    this.formDefinition = NestedScreenLayout;
    this.formValue = NestedScreenLayoutValue;
    //cthis.formDefinition = ReactiveLayoutTest;

    this.stepIndex = 0;
    this._formGenerator.buildForm(this.formDefinition.screens[this.stepIndex]);  
    // this._formGenerator.buildForm(this.formDefinition.screens[0]);

    this._formGenerator.form$.pipe(
      filter(val => val != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.form = form;
      if (this.formValue != null) {
        this._formGenerator.setFormValue(this.form, this.formValue[this.stepIndex]);
        // this._formGenerator.setFormValue(this.form, this.formValue);
      }
    });
  }

  onSubmit() {
    this._formGenerator.recurseFormGroup(this.form, 'TOUCH_AND_VALIDATE');
    console.log(this.form);
    if (this.form.valid) {
      // this.next();
    }
    // const changes = deepDiff(this.formValue, this.form.getRawValue());
    // console.log(changes, this.form, this.form.getRawValue());
  }

  onReset() {
    this._formGenerator.recurseFormGroup(this.form, 'UNTOUCHED_AND_PRISTINE');
    if (this.formValue && this.formValue[this.stepIndex] != null) {
      // if (this.formValue && this.formValue != null) {
      this._formGenerator.setFormValue(this.form, this.formValue[this.stepIndex]);
      this.reset$.next();
    } else {
      this.onClear();
    }
  }

  onClear() {
    this.cleared$.next();
    this._formGenerator.recurseFormGroup(this.form, 'UNTOUCHED_AND_PRISTINE');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
