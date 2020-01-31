import { Injectable } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';
import * as changeCase from 'change-case';
import { ElementType } from './dui-elements.enum';
import { DuiValidatorRegistryService } from './dui-validator-registry.service';
import { Required } from '../form-validators/required.validator';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class DuiFormGeneratorService {

  private _form: FormGroup;
  private _empty: Array<boolean> = [];

  resetForm$: Subject<void> = new Subject<void>();
  form$: BehaviorSubject<FormGroup> = new BehaviorSubject(null);

  constructor(
    private _fb: FormBuilder,
    private _vrs: DuiValidatorRegistryService
  ) { }

  buildForm(definition: any): void {
    this._form = null;
    this._form = this._fb.group({});
    this.createStep(definition);
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
    control['element'] = inputElement;
    if (inputElement.validators) {
      let validators = [];
      let groupValidators = [];
      inputElement.validators.forEach(validator => {
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
          validator.objectScope != null && validator.objectScope ?
            groupValidators.push(validatorFn(inputElement.modelProperty, validator.metadata)) :
            validators.push(validatorFn(inputElement.modelProperty, validator.metadata));
        }
      });
      control.setValidators(validators);
      currFormElm.validator
        ? currFormElm.setValidators([...groupValidators, currFormElm.validator])
        : currFormElm.setValidators(validators);
      control['element'].originalValidators = cloneDeep(validators);
    }
    currFormElm.addControl(inputElement.modelProperty, control);
    return currFormElm;
  }

  processObject_r(objectElement, currFormElm: FormGroup, root = false) {
    if (!root) {
      currFormElm.addControl(objectElement.modelProperty, this._fb.group({}));
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
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
            validators.push(validatorFn(objectElement.modelProperty, validator.metadata));
        }
      });
      currFormElm.setValidators(validators);
    }
    return currFormElm;
  }

  processArray_r(arrayElement, currFormElm: FormGroup) {
    currFormElm.addControl(arrayElement.modelProperty, this._fb.array([]));
    currFormElm.controls[arrayElement.modelProperty]['controls'].push(this._fb.group({}));
    if (arrayElement.elements && arrayElement.elements.length) {
      arrayElement.elements.forEach(element => {
        this.processElement_r(element, <FormGroup>currFormElm.controls[arrayElement.modelProperty]['controls'][0]);
      });
    }
    const rowTemplate = cloneDeep(currFormElm.controls[arrayElement.modelProperty]['controls'][0]);
    if (arrayElement.validators) {
      let arrayValidators = [];
      arrayElement.validators.forEach(validator => {
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
            arrayValidators.push(validatorFn(arrayElement.modelProperty, validator.metadata));
        }
      });
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
      case 'minLength': error = `Minimum length for this field is ${error.value.requiredLength}`; break;
      case 'mustMatch': error = `Does not match - ${changeCase.sentenceCase(error.value.field)}`; break;
      default: break;
    }
    return error;
  }

}
