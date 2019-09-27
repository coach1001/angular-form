import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGeneratorService } from './form-generator.service';
import { Layout, Value, FamilyLayout, FamilyValue } from './test-form-layout';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { ElementGroupComponent } from './element-group/element-group.component';
import { ElementArrayComponent } from './element-array/element-array.component';
import { ElementControlComponent } from './element-control/element-control.component';
import * as deepDiff from 'deep-diff';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  title = 'angular-form';
  stepIndex: number;
  formDefinition: any;
  formValue: any;
  form: FormGroup;

  constructor(
    private _formGenerator: FormGeneratorService) {
  }

  ngOnInit(): void {

    // this.formDefinition = Layout;
    // this.formValue = Value;
    this.formDefinition = FamilyLayout;
    this.formValue = FamilyValue;
    this.stepIndex = 0;

    this._formGenerator.buildForm(this.formDefinition.screens[this.stepIndex], this.formValue);

    this._formGenerator.form$.pipe(
      filter(val => val != null),
      takeUntil(this._destroy$)
    ).subscribe(form => {
      this.form = form;
    });
    
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getElementComponent(type: string): any {
    if (type === 'CONTROL') {
      return ElementControlComponent;
    } else if (type === 'OBJECT') {
      return ElementGroupComponent;
    } else if (type === 'ARRAY') {
      return ElementArrayComponent;
    }
    return null;
  }

  getElementInputs(element: any): any {
    return { ...element, parent: this.form };
  }

  onSubmit() {
    const changes = deepDiff(this.formValue, this.form.getRawValue());
    console.log(this.form.getRawValue());
  }

  onReset() {
    this.form.reset(this.formValue);
    this._formGenerator.resetForm$.next();
  }

}
