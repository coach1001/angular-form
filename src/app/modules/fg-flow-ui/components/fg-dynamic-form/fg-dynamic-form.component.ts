import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FlowService } from '../../services/flow.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FormDataService } from '../../services/form-data.service';
import { diff } from 'deep-diff';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fg-dynamic-form',
  templateUrl: './fg-dynamic-form.component.html',
  styleUrls: ['./fg-dynamic-form.component.scss']
})
export class FgDynamicFormComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = null;

  constructor(
    private _flow: FlowService,
    private _formGenerator: FormGeneratorService,
    private _formData: FormDataService
  ) {
  }

  ngOnInit(): void {
    this._flow.currentStep$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(step => {
      this._formGenerator.buildForm(step);
    });
    this._formGenerator.form$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.form = form;
      const currentStepName = this._flow.currentStepName$.value;
      const currentModule = this._flow.currentFlow$.value.module;
      const currentFlow = this._flow.currentFlow$.value.flow.flow;
      const currentFlowId = this._flow.currentFlowId$.value;
      const stepData = this._formData.getStepData(currentFlowId, currentModule, currentFlow, currentStepName);
      if (stepData != null) {
        this._formGenerator.setFormValue(this.form, stepData);
      }
    });
    this._formData.allFlowData$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      const currentStepName = this._flow.currentStepName$.value;
      const currentModule = this._flow.currentFlow$.value.module;
      const currentFlow = this._flow.currentFlow$.value.flow.flow;
      const currentFlowId = this._flow.currentFlowId$.value; 
      const stepData = this._formData.getStepData(currentFlowId, currentModule, currentFlow, currentStepName);
      if (stepData != null && this.form != null) {
        const formValue = this.form.getRawValue();
        const difference = diff(formValue, stepData);
        if(difference != null) {
          this._formGenerator.setFormValue(this.form, stepData);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
