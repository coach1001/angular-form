import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {

  private _form: FormGroup;
  private _empty: Array<boolean> = [];

  resetForm$: Subject<void> = new Subject<void>();
  form$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);
  flowDefinition$: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  buildForm(definition: any): void {
    this._form = this._formBuilder.group({});
    this.createStep(definition);
    this.form$.next(this._form);
  }

  createStep(stepDefinition: any): void {
    stepDefinition.elements.forEach(element => {
      this.processElement_r(element, this._form);
    });
  }

  processElement_r(element, currFormElm: FormGroup): FormGroup {
    switch (element.type) {
      case 'CONTROL':
        this.processControl(element, currFormElm)
        break;
      case 'OBJECT':
        this.processObject_r(element, currFormElm);
        break;
      case 'ARRAY':
        this.processArray_r(element, currFormElm);
        break;
      default: break;
    }
    return currFormElm;
  }

  processControl(inputElement, currFormElm: FormGroup) {
    const control = new FormControl();
    if(inputElement.required) {
      control.setValidators([Validators.required]);
    }
    currFormElm.addControl(inputElement.name, control);
    return currFormElm;
  }

  processObject_r(objectElement, currFormElm: FormGroup) {
    currFormElm.addControl(objectElement.name, this._formBuilder.group({}));
    currFormElm = <FormGroup>currFormElm.controls[objectElement.name];
    if (objectElement.elements && objectElement.elements.length) {
      objectElement.elements.forEach(element => {
        this.processElement_r(element, currFormElm);
      });
    }
    return currFormElm;
  }

  processArray_r(arrayElement, currFormElm: FormGroup) {
    currFormElm.addControl(arrayElement.name, this._formBuilder.array([]));
    currFormElm.controls[arrayElement.name]['controls'].push(this._formBuilder.group({}));
    if (arrayElement.elements && arrayElement.elements.length) {
      arrayElement.elements.forEach(element => {
        this.processElement_r(element, <FormGroup>currFormElm.controls[arrayElement.name]['controls'][0]);
      });
    }
    const rowTemplate = cloneDeep(currFormElm.controls[arrayElement.name]['controls'][0]);
    this.recurseFormGroup(rowTemplate, 'CLEAR_VALUES');
    currFormElm.controls[arrayElement.name]['rowTemplate'] = rowTemplate;
    currFormElm.controls[arrayElement.name]['controls'] = [];
  }

  setFormValue(group: FormGroup, value: any) {
    Object.keys(group.controls).forEach((key: string) => {      
      const abstractControl = group.controls[key];
      const controlValue = value[key];
      if (abstractControl instanceof FormGroup && controlValue != null) {
        this.setFormValue(abstractControl, controlValue);
      } else if (abstractControl instanceof FormArray && controlValue != null) {
        abstractControl['controls'] = [];
        controlValue.forEach((val, index) => {
          abstractControl['controls'].push(cloneDeep(abstractControl['rowTemplate']));
          this.setFormValue(<FormGroup>abstractControl['controls'][index], val);
        });
      } else if (controlValue != null) {
        abstractControl.patchValue(controlValue);
      }
    });
  }

  recurseFormGroup(group: FormGroup | FormArray, operation: string = 'NO_OPERATION') {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];
      if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
        if (abstractControl instanceof FormArray) {
          abstractControl.controls.length > 0 ? this._empty.push(false) : this._empty.push(true);
          this.recurseFormGroup(abstractControl, operation);
        } else {
          this.recurseFormGroup(abstractControl, operation);
        }
      } else {
        abstractControl.value != null ? this._empty.push(false) : this._empty.push(true);
        if (operation === 'CLEAR_VALUES') {
          abstractControl.patchValue(null);
        } else if (operation === 'TOUCH_AND_VALIDATE') {
          abstractControl.markAsTouched()
          abstractControl.updateValueAndValidity();
        } else if (operation === 'MARK_UNTOUCHED_AND_MAKE_PRISTINE') {
          abstractControl.markAsUntouched();
          abstractControl.markAsPristine();      
        }
      }
    });
  }

  isEmpty(formGroup: FormGroup): boolean {
    this._empty = [];
    this._empty.push(true);
    this.recurseFormGroup(formGroup);
    return this._empty.every(val => val === true);
  }

}
