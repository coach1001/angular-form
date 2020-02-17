import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { diff } from 'deep-diff';
import { FormGroup } from '@angular/forms';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';
import { DuiFormDataService } from '../../../dui-form/services/dui-form-data.service';
import { DuiFlowService } from '../../../dui-flow/services/dui-flow.service';

@Component({
  selector: 'dui-form',
  templateUrl: './dui-form.component.html',
  styleUrls: ['./dui-form.component.scss']
})
export class DuiFormComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  form: FormGroup = null;

  constructor(
    private _fs: DuiFlowService,
    private _fgs: DuiFormGeneratorService,
    private _fds: DuiFormDataService
  ) {
  }

  ngOnInit(): void {    
    this._fs.currentStep$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(step => {      
      this._fgs.buildForm(step);
    });
    this._fgs.form$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.form = form;
      const currentStep = this._fs.currentStep$.value;
      const currentModule = this._fs.currentFlow$.value.module;
      const currentFlow = this._fs.currentFlow$.value.flow.flow;
      const currentFlowId = this._fs.currentFlowId$.value;
      const stepData = this._fds.getStepData(currentFlowId, currentModule, currentFlow, currentStep.modelProperty);
      if (stepData != null) {
        this._fgs.setFormValue(this.form, stepData);
      }
    });
    this._fds.allFlowData$.pipe(
      filter(value => value != null),
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      const currentStep = this._fs.currentStep$.value;
      const currentModule = this._fs.currentFlow$.value.module;
      const currentFlow = this._fs.currentFlow$.value.flow.flow;
      const currentFlowId = this._fs.currentFlowId$.value;
      const stepData = this._fds.getStepData(currentFlowId, currentModule, currentFlow, currentStep.modelProperty);
      if (stepData != null && this.form != null) {
        const formValue = this.form.getRawValue();
        const difference = diff(formValue, stepData);
        if (difference != null) {
          this._fgs.setFormValue(this.form, stepData);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
