import { Component, OnInit, OnDestroy } from '@angular/core';
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
    private _config: NgDuiConfigService,
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
    if (index < this.stepIndex) {
      return 'done';
    } else {
      const step = this.flowSteps[index];
      if (step != null) {
        return step.icon;
      }
    }
    return '';
  }

  stepIconMobile(): string {
    return `${this.flowSteps[this.stepIndex].icon}`;
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

  stepIconColor(index: number): string {
    if (index < this.stepIndex) {
      return 'white';
    } else if (index == this.stepIndex) {
      return '';
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

