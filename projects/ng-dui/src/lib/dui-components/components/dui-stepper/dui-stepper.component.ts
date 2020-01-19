import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as changeCase from 'change-case';
import { DuiFlowService } from '../../../dui-flow/services/dui-flow.service';
import { NgDuiConfigService } from '../../../services/ng-dui-config.service'

@Component({
  selector: 'dui-stepper',
  templateUrl: './dui-stepper.component.html',
  styleUrls: ['./dui-stepper.component.scss']
})
export class DuiStepperComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  stepIndex: number = null;
  flowSteps: Array<any> = [];

  constructor(
    @Inject(NgDuiConfigService) private _config,
    private _fs: DuiFlowService) 
    { }

  ngOnInit() {
    combineLatest(this._fs.currentFlow$, this._fs.currentStepName$)
      .pipe(
        takeUntil(this._destroy$)
      ).subscribe(value => {
        this.flowSteps = value[0].flow.steps;
        this.stepIndex = this.flowSteps.findIndex(step => step.name === value[1])
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  stepLabel(index: number): string {
    const step = this.flowSteps[index];
    return changeCase.sentenceCase(step.name).toUpperCase();
  }

  stepIcon(index: number): string {
    let _icon = 'desktop-stepper-icon mat-elevation-z2 medium ';
    if (index < this.stepIndex) {
      _icon += 'cicon-tick'
    } else {
      const step = this.flowSteps[index];
      if (step != null) {
        _icon += step.icon;
      }
    }
    return _icon;
  }

  stepIconMobile(): string {
    return `${this.flowSteps[this.stepIndex].icon} mobile-stepper-icon medium mat-fab`;
  }

  stepColor(index: number): string {
    if (index < this.stepIndex) {
      return 'accent';
    } else if (index >= this.stepIndex) {
      return 'primary';
    } else {
      return 'primary'
    }
  }

  connectorClass(index: number): string {
    let _class = 'mat-elevation-z2 step-connector ';
    if (index < this.stepIndex) {
      if ((index + 1) === this.stepIndex) {
        _class += 'done-to-current';
      } else {
        _class += 'done-to-done';
      }
    } else {
      _class += 'current-to-next';
    }
    return _class;
  }

  hideBack() {
    return this.stepIndex === 0;
  }

  hideNext() {
    return this.stepIndex === (this.flowSteps.length - 1);
  }

  back(): void {
    this._fs.backStep();
  }

  next(): void {
    this._fs.nextStep();
  }

  gotoStep(index: number): void {
    if ((index !== this.stepIndex && !this._config.production) || index < this.stepIndex) {
      this._fs.gotoStep(this.flowSteps[index].name);
    }
  }

}

