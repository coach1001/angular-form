import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { FgArrayComponent } from '../fg-array/fg-array.component';
import { FgControlComponent } from '../fg-control/fg-control.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGeneratorService } from '../form-generator.service';
import * as changeCase from 'change-case';

@Component({
  selector: 'app-fg-group',
  templateUrl: './fg-group.component.html',
  styleUrls: ['./fg-group.component.scss']
})
export class FgGroupComponent implements OnInit, OnDestroy {
  @Input()
  controlIn: FormGroup;
  @Input()
  parent: FormGroup;
  @Input()
  parentCleared$: Subject<void> =  new Subject<void>();
  @Input()
  parentReset$: Subject<void> =  new Subject<void>();

  controlKeys: Array<string> = [];

  private _destroy$: Subject<void> = new Subject<void>();
  
  cleared$: Subject<void> = new Subject<void>();
  reset$: Subject<void> = new Subject<void>();

  constructor(
    private _formGenerator: FormGeneratorService
  ) { }

  ngOnInit() {
    this.controlKeys = Object.keys(this.controlIn.controls);
    this.parentCleared$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      if (!this._formGenerator.isEmpty(<FormGroup> this.controlIn)) {
        this.cleared$.next();
      }
    });
    this.parentReset$
    .pipe(
      takeUntil(this._destroy$)
    ).subscribe(_ => {
      this.reset$.next();
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getComponent(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    if (control instanceof FormGroup) {
      return FgGroupComponent;
    } else if(control instanceof FormArray) {
      return FgArrayComponent;
    } else { // FormControl
      return FgControlComponent;
    }
  }

  getComponentInputs(controlKey: string) {
    const control = this.controlIn.controls[controlKey];
    return {
      controlIn: control,
      parent: this.controlIn,
      name: controlKey,
      label: changeCase.sentenceCase(controlKey),
      parentCleared$: this.cleared$,
      parentReset$: this.reset$
    };
  }
}
