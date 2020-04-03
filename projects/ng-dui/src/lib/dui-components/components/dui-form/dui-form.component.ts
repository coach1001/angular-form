import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';
import { diff } from 'deep-diff';
import { FormGroup } from '@angular/forms';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';
import { DuiFormDataService } from '../../../dui-form/services/dui-form-data.service';
import { DuiFlowService } from '../../../dui-flow/services/dui-flow.service';
import { TaskType } from '../../../dui-form/services/dui-task.enum';

@Component({
  selector: 'dui-form',
  templateUrl: './dui-form.component.html',
  styleUrls: ['./dui-form.component.scss']
})
export class DuiFormComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  private _emitForm = false;
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
      const tasks = form['element']['tasks'] as Array<any>;
      const currentStep = this._fs.currentStep$.value;
      const currentModule = this._fs.currentFlow$.value.module;
      const currentFlow = this._fs.currentFlow$.value.flow.flow;
      const currentFlowId = this._fs.currentFlowId$.value;
      const stepData = this._fds.getStepData(currentFlowId, currentModule, currentFlow, currentStep.modelProperty);
      if (stepData != null) {
        this._fgs.setFormValue(this.form, stepData);
      }
      if (tasks != null && tasks.length > 0) {
        const hasPeriTasks = tasks.find(task => task.taskType === TaskType.PeriTask);
        if (hasPeriTasks != null) {
          form.valueChanges
            .pipe(
              debounceTime(500),
              takeUntil(this._destroy$)
            )
            .subscribe(val => {
              this._emitForm = false;
              this._fs.RunStepPeriTasks(form);
            });
        }
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
          this._fgs.setFormValue(this.form, stepData, this._emitForm);
          this._emitForm = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
