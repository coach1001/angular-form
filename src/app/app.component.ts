import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './modules/fg-flow-ui/services/form-generator.service';
import {
  NestedScreenLayoutValue, NestedScreenLayout,
  Layout, Value, 
  FamilyLayout, FamilyValue, 
  MultiScreenLayout, ScreenValue, 
  ReactiveLayoutTest, ReactiveLayoutTestValue
} from './test-form-layout';
import { TestFlow } from './test-flow';
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
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();
  formId = Math.floor(Math.random() * 10000).toString();

  flowDefinition: any;

  formDefinitions: Array<any> = [];
  formData: Array<any> = [];

  numberOfSteps: number;

  constructor(
    private _formGenerator: FormGeneratorService) {
  }

  ngOnInit(): void {
    this.stepIndex = 0;
    this.flowDefinition = TestFlow;
    this.numberOfSteps = this.flowDefinition.steps.length;
    this._formGenerator.buildForm(this.flowDefinition.steps[this.stepIndex]);  
    this._formGenerator.form$.pipe(
      filter(val => val != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.formDefinitions[this.stepIndex] = form;
    });
  }

  onSubmit() {
    this._formGenerator.recurseFormGroup(this.formDefinitions[this.stepIndex], 'TOUCH_AND_VALIDATE');
    if (this.formDefinitions[this.stepIndex].valid) {
      this.nextStep();
    }
  }

  nextStep() {
    this.formId = Math.floor(Math.random() * 10000).toString();
    this.formData[this.stepIndex] = this.formDefinitions[this.stepIndex].getRawValue();
    this.stepIndex += 1;
    if(this.stepIndex > this.numberOfSteps - 1) {
      this.stepIndex = 0;
    }
    if(this.formDefinitions[this.stepIndex] == null) {
      this._formGenerator.buildForm(this.flowDefinition.steps[this.stepIndex]);
    } 
    this.onReset();
  }

  onReset() {
    this._formGenerator.recurseFormGroup(this.formDefinitions[this.stepIndex], 'UNTOUCHED_AND_PRISTINE');
    if (this.formData && this.formData[this.stepIndex] != null) {
      this._formGenerator.setFormValue(this.formDefinitions[this.stepIndex], this.formData[this.stepIndex]);
      this.reset$.next();
    }
  }

  onClear() {
    this.cleared$.next();
    this._formGenerator.recurseFormGroup(this.formDefinitions[this.stepIndex], 'UNTOUCHED_AND_PRISTINE');
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
