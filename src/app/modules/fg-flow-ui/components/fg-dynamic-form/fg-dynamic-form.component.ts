import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlowService } from '../../services/flow.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { FormGeneratorService } from '../../services/form-generator.service';
import { FormDataService } from '../../services/form-data.service';

@Component({
  selector: 'app-fg-dynamic-form',
  templateUrl: './fg-dynamic-form.component.html',
  styleUrls: ['./fg-dynamic-form.component.scss']
})
export class FgDynamicFormComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  form: any = null;

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
      const currentIndex = this._flow.currentStepIndex$.value;
      const currentModule = this._flow.currentFlow$.value.module;
      const currentFlow = this._flow.currentFlow$.value.flow.flow;
      const currentFlowId = this._flow.currentFlowId$.value;

      const stepData = this._formData.getStepData(currentFlowId, currentModule, currentFlow, currentIndex);
      if (stepData != null) {
        this._formGenerator.setFormValue(this.form, stepData);
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
