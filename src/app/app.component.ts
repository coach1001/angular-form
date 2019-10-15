import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './modules/fg-flow-ui/services/form-generator.service';
import { TestModule } from './test-flow';
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
  buildFormIndex: number;
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();

  formId = Math.floor(Math.random() * 10000).toString();
  flowDefinition: any;
  formDefinitions: Array<any> = [];
  formData: Array<any> = [];
  numberOfSteps: number;
  currentForm = null;

  constructor(
    private _formGenerator: FormGeneratorService) {
  }

  ngOnInit(): void {
    this.stepIndex = 0;
    this.buildFormIndex = 0;
    this.flowDefinition = TestModule;
    this.numberOfSteps = this.flowDefinition.steps.length;
    this._formGenerator.buildForm(this.flowDefinition.steps[this.buildFormIndex]);
    this._formGenerator.form$.pipe(
      filter(val => val != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.formDefinitions[this.buildFormIndex] = form;
      if(this.buildFormIndex === 0) {
        this.currentForm = this.formDefinitions[this.buildFormIndex];
      }
      this.buildFormIndex += 1;
      if (this.buildFormIndex < this.numberOfSteps) {
        this._formGenerator.buildForm(this.flowDefinition.steps[this.buildFormIndex]);
      }
    });
  }

  onSubmit() {
    this._formGenerator.recurseFormGroup(this.currentForm, 'TOUCH_AND_VALIDATE');
    if (this.currentForm.valid) {
      this.nextStep();
    }
  }

  nextStep() {
    // this.formId = Math.floor(Math.random() * 10000).toString();
    this.formData[this.stepIndex] = this.currentForm.getRawValue();
    this.stepIndex += 1;
    if (this.stepIndex > this.numberOfSteps - 1) {
      this.stepIndex = 0;
    }
    this.currentForm = this.formDefinitions[this.stepIndex];
    this.onReset();
  }

  onReset() {
    this._formGenerator.recurseFormGroup(this.currentForm, 'UNTOUCHED_AND_PRISTINE');
    if (this.formData && this.formData[this.stepIndex] != null) {
      this._formGenerator.setFormValue(this.currentForm, this.formData[this.stepIndex]);
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
