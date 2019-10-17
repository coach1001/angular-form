import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlowService } from '../../services/flow.service';
import { Subject, Observable } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';
import { FormGeneratorService } from '../../services/form-generator.service';

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
    private _formGenerator: FormGeneratorService
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
      console.log(this.form);
    });
  }
  
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
