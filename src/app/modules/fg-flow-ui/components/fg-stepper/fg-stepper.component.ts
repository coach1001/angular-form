import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { FlowService } from '../../services/flow.service';
import { takeUntil } from 'rxjs/operators';
import * as changeCase from 'change-case';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-fg-stepper',
  templateUrl: './fg-stepper.component.html',
  styleUrls: ['./fg-stepper.component.scss']
})
export class FgStepperComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  stepIndex: number = null;
  flowSteps: Array<any> = [];

  constructor(private _flow: FlowService) { }

  ngOnInit() {
    combineLatest(this._flow.currentFlow$, this._flow.currentStepName$)
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
    this._flow.backStep();
  }

  next(): void {
    this._flow.nextStep();
  }

  gotoStep(index: number): void {
    if ((index !== this.stepIndex && !environment.production) || index < this.stepIndex) {
      this._flow.gotoStep(this.flowSteps[index].name);
    }
  }

}
