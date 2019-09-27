import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  private _form: FormGroup;
  
  resetForm$: Subject<void> = new Subject<void>();
  form$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  buildForm(definition: any, formInitValue: any): void {
    this._form = this._formBuilder.group({});
    this.createStep(definition, formInitValue);
    this._form.patchValue(formInitValue);
    this.form$.next(this._form);
  }

  createStep(stepDefinition: any, formInitValue: any): void {
    stepDefinition.elements.forEach(element => {
      this.processElement_r(element, this._form, formInitValue);
    });
  }

  processElement_r(element, currFormElm: FormGroup, value: any): FormGroup {
    switch (element.type) {
      case 'CONTROL':
        this.processControl(element, currFormElm, value ? value[element.name] : null)
        break;
      case 'OBJECT':
        this.processObject_r(element, currFormElm, value ? value[element.name] : null);
        break;
      case 'ARRAY':
        this.processArray_r(element, currFormElm, value ? value[element.name] : null);
        break;
      default: break;
    }
    return currFormElm;
  }

  processControl(inputElement, currFormElm: FormGroup, value: any) {
    const control = new FormControl();
    currFormElm.addControl(inputElement.name, control);
    return currFormElm;
  }

  processObject_r(objectElement, currFormElm: FormGroup, value: any) {
    currFormElm.addControl(objectElement.name, this._formBuilder.group({}));
    currFormElm = <FormGroup>currFormElm.controls[objectElement.name];
    if (objectElement.elements && objectElement.elements.length) {
      objectElement.elements.forEach(element => {
        this.processElement_r(element, currFormElm, value);
      });
    }
    return currFormElm;
  }

  processArray_r(arrayElement, currFormElm: FormGroup, value: any) {

    const numArrElm = value && value.length ? value.length : 1;
    const emptyArray = !(value && value.length);

    currFormElm.addControl(arrayElement.name, this._formBuilder.array([]));
    currFormElm.controls[arrayElement.name]['emptyArray'] = emptyArray;

    for (let i = 0; i < numArrElm; i++) {

      currFormElm.controls[arrayElement.name]['controls'][i] = this._formBuilder.group({});
      const tempCurrFormElm = <FormGroup>currFormElm.controls[arrayElement.name]['controls'][i];

      if (arrayElement.elements && arrayElement.elements.length) {
        arrayElement.elements.forEach(element => {
          this.processElement_r(element, tempCurrFormElm, value ? value[i] : null);
        });
      }
    }

    const rowTemplate = cloneDeep(currFormElm.controls[arrayElement.name]['controls'][0]);
    this.recurseFormGroup(rowTemplate, 'CLEAR_VALUES');
    currFormElm.controls[arrayElement.name]['rowTemplate'] = rowTemplate;

    if (emptyArray) {
      currFormElm.controls[arrayElement.name]['controls'] = [];
    }
  }

  setFormValue(value: any) {
    const form = this.form$.value;
    form.patchValue(value);
    this.form$.next(form);
  }

  recurseFormGroup(group: FormGroup | FormArray, operation: string): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];
      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        this.recurseFormGroup(abstractControl, operation);
      } else {
        if (operation === 'CLEAR_VALUES') {
          abstractControl.patchValue(null);
        }
      }
    });
  }

}
