import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { FlowService } from '../../services/flow.service';
import { takeUntil } from 'rxjs/operators';
import * as changeCase from 'change-case';

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
    combineLatest(this._flow.currentFlow$, this._flow.currentStepIndex$)
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(value => {
      this.flowSteps = value[0].flow.steps;
      this.stepIndex = value[1];
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
    let _icon = 'mat-elevation-z2 medium ';
    if(index < this.stepIndex) {
      _icon += 'cicon-tick'
    } else {
      const step = this.flowSteps[index];
      if (step != null) {
        _icon += step.icon;
      } 
    }
    return _icon;
  }

  stepColor(index: number): string {
    if (index < this.stepIndex) {
      return 'accent';
    } else if (index >= this.stepIndex) {
      return 'primary';
    }
  }

  connectorClass(index: number): string {
    let _class = 'mat-elevation-z2 step-connector ';
    if (index < this.stepIndex) {
      if((index + 1) === this.stepIndex) {
        _class += 'done-to-current';
      } else {
        _class += 'done-to-done';
      }
    } else {
      _class += 'current-to-next';
    }
    return _class;
  }

}
