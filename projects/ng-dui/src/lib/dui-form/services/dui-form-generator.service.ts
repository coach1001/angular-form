import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators, MinLengthValidator, AbstractControl, ValidatorFn } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';
import { MustMatch } from '../form-validators/must-match.validator';
import { RequiredIf } from '../form-validators/required-if.validator';
import * as changeCase from 'change-case';
import { ElementType } from './dui-elements.enum';

@Injectable({
  providedIn: 'root'
})
export class DuiFormGeneratorService {

  private _form: FormGroup;
  private _empty: Array<boolean> = [];

  resetForm$: Subject<void> = new Subject<void>();
  form$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  constructor(
    private _formBuilder: FormBuilder,
  ) { }

  buildForm(definition: any): void {
    this._form = null;
    this._form = this._formBuilder.group({});
    this.createStep(definition);
    console.log(this._form);
    this.form$.next(this._form);
  }

  createStep(stepDefinition: any): void {
    stepDefinition.elements.forEach(element => {
      this.processElement_r(element, this._form);
    });
    this.processObject_r(stepDefinition, this._form, true);
  }

  processElement_r(element, currFormElm: FormGroup): FormGroup {
    switch (element.elementType) {
      case ElementType.Control:
        this.processControl(element, currFormElm)
        break;
      case ElementType.Object:
        this.processObject_r(element, currFormElm);
        break;
      case ElementType.Array:
        this.processArray_r(element, currFormElm);
        break;
      default: break;
    }
    return currFormElm;
  }

  processControl(inputElement, currFormElm: FormGroup) {
    const control = new FormControl();
    if (inputElement.validations) {
      let validators = [];
      inputElement.validators.forEach(validator => {
        switch (validator.name) {
          case 'required': validators.push(Validators.required); break;
          case 'email': validators.push(Validators.email); break;
          case 'min': validators.push(Validators.min(validator.value)); break;
          case 'max': validators.push(Validators.max(validator.value)); break;
          case 'minLength': validators.push(Validators.minLength(validator.metadata.length)); break;
          case 'mustMatch':
            if (validator.objectScope) {
              currFormElm.addValidator(MustMatch(inputElement.modelProperty, validator.metadata));
            }
            break;
          case 'requiredIf':
            if (validator.objectScope) {
              currFormElm.addValidator(RequiredIf(inputElement.modelProperty, validator.metadata));
            }
            break;
          default: break;
        }
      });
      control.setValidators(validators);
    }
    control['element'] = inputElement;
    currFormElm.addControl(inputElement.modelProperty, control);
    return currFormElm;
  }

  processObject_r(objectElement, currFormElm: FormGroup, root = false) {
    if (!root) {
      currFormElm.addControl(objectElement.modelProperty, this._formBuilder.group({}));
      currFormElm = <FormGroup>currFormElm.controls[objectElement.modelProperty];
      currFormElm['element'] = objectElement;
      if (objectElement.elements && objectElement.elements.length) {
        objectElement.elements.forEach(element => {
          this.processElement_r(element, currFormElm);
        });
      }
    } else {
      currFormElm['element'] = objectElement;
    }
    if (objectElement.validators) {
      let validators = [];
      objectElement.validators.forEach(validator => {
        switch (validator.name) {
          case 'required': validators.push(Validators.required); break;
          case 'minLength': validators.push(Validators.minLength(validator.metadata.length)); break;
          default: break;
        }
      });
      currFormElm.setValidators(validators);
    }
    return currFormElm;
  }

  processArray_r(arrayElement, currFormElm: FormGroup) {
    currFormElm.addControl(arrayElement.modelProperty, this._formBuilder.array([]));
    currFormElm.controls[arrayElement.modelProperty]['controls'].push(this._formBuilder.group({}));
    if (arrayElement.elements && arrayElement.elements.length) {
      arrayElement.elements.forEach(element => {
        this.processElement_r(element, <FormGroup>currFormElm.controls[arrayElement.modelProperty]['controls'][0]);
      });
    }
    const rowTemplate = cloneDeep(currFormElm.controls[arrayElement.modelProperty]['controls'][0]);

    if (arrayElement.validations) {
      let validators = [];
      let arrayValidators = [];
      arrayElement.validators.forEach(validator => {
        switch (validator.name) {
          case 'required': arrayValidators.push(Validators.required); break;
          // case 'mustMatch': validators.push(MustMatch(validation.value[0], validation.value[1])); break;
          // case 'requiredIf': validators.push(RequiredIf(validation.controlName, validation.expression)); break;
          default: break;
        }
      });
      rowTemplate.setValidators(validators);
      currFormElm.controls[arrayElement.modelProperty].setValidators(arrayValidators);
    }
    this.recurseFormGroup(rowTemplate, 'CLEAR_VALUES');
    currFormElm.controls[arrayElement.modelProperty]['rowTemplate'] = rowTemplate;
    currFormElm.controls[arrayElement.modelProperty]['element'] = arrayElement;
    currFormElm.controls[arrayElement.modelProperty]['controls'] = [];
  }

  setFormValue(group: FormGroup, value: any) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];
      const controlValue = value[key] ? value[key] : null;
      if (abstractControl instanceof FormGroup) {
        this.setFormValue(abstractControl, controlValue);
      } else if (abstractControl instanceof FormArray) {
        abstractControl['controls'] = [];
        if (controlValue != null) {
          controlValue.forEach((val, index) => {
            abstractControl['controls'].push(cloneDeep(abstractControl['rowTemplate']));
            this.setFormValue(<FormGroup>abstractControl['controls'][index], val);
          });
        }
      } else {
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
        } else if (operation === 'DISABLE') {
          abstractControl.disable();
        } else if (operation === 'TOUCH_AND_VALIDATE') {
          abstractControl.markAsTouched();
          abstractControl.updateValueAndValidity();
        } else if (operation === 'UNTOUCHED_AND_PRISTINE') {
          abstractControl.markAsUntouched();
          abstractControl.markAsPristine();
        } else if (operation === 'VALIDATE') {
          abstractControl.updateValueAndValidity();
        }
      }
    });
    if (operation === 'DISABLE') {
      group.disable();
    } else if (operation === 'TOUCH_AND_VALIDATE') {
      group.markAsTouched()
      group.updateValueAndValidity();
    } else if (operation === 'UNTOUCHED_AND_PRISTINE') {
      group.markAsUntouched();
      group.markAsPristine();
    } else if (operation === 'VALIDATE') {
      group.updateValueAndValidity();
    }
  }

  isEmpty(formGroup: FormGroup): boolean {
    this._empty = [];
    this._empty.push(true);
    this.recurseFormGroup(formGroup);
    return this._empty.every(val => val === true);
  }

  getErrorValidationMessage(error: any) {
    switch (error.key) {
      case 'required': error = `This field is required`; break;
      case 'email': error = `Not a valid email address`; break;
      case 'min': error = `Minimum is ${error.value.min}`; break;
      case 'max': error = `Maximum is ${error.value.max}`; break;
      case 'mustMatch': error = `Does not match - ${changeCase.sentenceCase(error.value.value)}`; break;
      default: break;
    }
    return error;
  }

}

declare module '@angular/forms' {
  interface AbstractControl {
    addValidator(validator: ValidatorFn): void;
  }
}

AbstractControl.prototype.addValidator = function (this: AbstractControl, validator: ValidatorFn) {
  if (validator == null) {
    return;
  }
  this.clearValidators();
  this.setValidators(this.validator ? [this.validator, validator] : validator);
};
