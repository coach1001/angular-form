import { Injectable, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormArray, FormGroup, FormControl, FormBuilder, Form } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import cloneDeep from 'lodash-es/cloneDeep';
import * as changeCase from 'change-case';
import { ElementType } from './dui-elements.enum';
import { ControlType } from './dui-controls.enum';
import { DuiValidatorRegistryService } from './dui-validator-registry.service';
import { MediaSize } from './dui-media-size.enum';
import { NgDuiConfigService } from '../../services/ng-dui-config.service';
import { uuid } from 'uuidv4';
import { ArrayOperation } from './dui-array-operation.enum';

@Injectable({
  providedIn: 'root'
})
export class DuiFormGeneratorService {

  private _form: FormGroup;
  private _empty: Array<boolean> = [];

  resetForm$ = new Subject<void>();
  form$ = new BehaviorSubject<FormGroup>(null);
  decorators: Array<any> = [];
  updateArrayKeys$ = new Subject<void>();

  constructor(
    private _fb: FormBuilder,
    private _vrs: DuiValidatorRegistryService,
    private _config: NgDuiConfigService,
    private _ar: ApplicationRef
  ) { }

  buildForm(definition: any): void {
    this._form = null;
    this.decorators = [];
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
        if (element.controlType !== ControlType.Decorator && element.controlType !== ControlType.Spacer) {
          this.processControl(element, currFormElm)
        } else {
          element['parentForm'] = currFormElm;
          this.decorators.push(element);
        }
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
    let validators = [];
    let parentValidators = [];
    control['element'] = inputElement;

    if (inputElement.validators) {
      inputElement.validators.forEach(validator => {
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
          validator.parentScope != null && validator.parentScope
            ? parentValidators.push(validatorFn(inputElement.modelProperty, validator.metadata))
            : validators.push(validatorFn(inputElement.modelProperty, validator.metadata));
        }
      });
      control.setValidators(validators);
      currFormElm.validator
        ? currFormElm.setValidators([...parentValidators, currFormElm.validator])
        : currFormElm.setValidators(parentValidators);
      control['element'].originalValidators = cloneDeep(validators);
    }
    inputElement.initiallyDisabled ? control.disable() : control.enable();
    currFormElm.addControl(inputElement.modelProperty, control);
    return currFormElm;
  }

  processObject_r(objectElement, currFormElm: FormGroup, root = false) {
    let validators = [];
    let parentValidators = [];

    if (!root) {
      const group = this._fb.group({});
      objectElement.initiallyDisabled ? group.disable() : group.enable();
      currFormElm.addControl(objectElement.modelProperty, group);
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
      objectElement.validators.forEach(validator => {
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
          validator.parentScope != null && validator.parentScope ?
            parentValidators.push(validatorFn(objectElement.modelProperty, validator.metadata)) :
            validators.push(validatorFn(objectElement.modelProperty, validator.metadata));
        }
      });
      currFormElm.setValidators(validators);
      currFormElm.parent.validator
        ? currFormElm.parent.setValidators([...parentValidators, currFormElm.parent.validator])
        : currFormElm.parent.setValidators(parentValidators);
      currFormElm['element'].originalValidators = cloneDeep(validators);
    }
    return currFormElm;
  }

  processArray_r(arrayElement, currFormElm: FormGroup) {
    let arrayValidators = [];
    let parentValidators = [];
    const array_ = this._fb.array([]);
    arrayElement.initiallyDisabled ? array_.disable() : array_.enable();
    currFormElm.addControl(arrayElement.modelProperty, array_);
    currFormElm.controls[arrayElement.modelProperty]['controls'].push(this._fb.group({}));
    if (arrayElement.elements && arrayElement.elements.length) {
      arrayElement.elements.forEach(element => {
        this.processElement_r(element, <FormGroup>currFormElm.controls[arrayElement.modelProperty]['controls'][0]);
      });
    }
    const rowTemplate = cloneDeep(currFormElm.controls[arrayElement.modelProperty]['controls'][0]);

    if (arrayElement.validators) {
      arrayElement.validators.forEach(validator => {
        const validatorFn = this._vrs.getValidatorFn(validator.name);
        if (validatorFn != null) {
          if (validatorFn != null) {
            validator.parentScope != null && validator.parentScope
              ? parentValidators.push(validatorFn(arrayElement.modelProperty, validator.metadata))
              : arrayValidators.push(validatorFn(arrayElement.modelProperty, validator.metadata));
          }
        }
      });
      currFormElm.controls[arrayElement.modelProperty].setValidators(arrayValidators);
      currFormElm.validator
        ? currFormElm.setValidators([...parentValidators, currFormElm.validator])
        : currFormElm.setValidators(parentValidators);
    }

    this.recurseFormGroup(rowTemplate, 'CLEAR_VALUES');
    currFormElm.controls[arrayElement.modelProperty]['rowTemplate'] = rowTemplate;
    currFormElm.controls[arrayElement.modelProperty]['element'] = arrayElement;
    currFormElm.controls[arrayElement.modelProperty]['element'].originalValidators = cloneDeep(arrayValidators);
    currFormElm.controls[arrayElement.modelProperty]['controls'] = [];
  }

  setFormValue(group: FormGroup, value: any, emitEvent = true, updateDisabledOnly = false) {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.controls[key];
      const controlValue = value != null && value[key] != null ? value[key] : null;
      if (abstractControl instanceof FormGroup) {
        this.setFormValue(abstractControl, controlValue, emitEvent, updateDisabledOnly);
      } else if (abstractControl instanceof FormArray) {        
        abstractControl.clear();
        if (controlValue != null) {
          controlValue.forEach((val, index) => {
            abstractControl.push(cloneDeep(abstractControl['rowTemplate']));
            this.setFormValue(<FormGroup>abstractControl['controls'][index], val, emitEvent, updateDisabledOnly);
          });
        }        
        this.updateArrayKeys$.next();
      } else {
        if (!updateDisabledOnly) {
          abstractControl.patchValue(controlValue, { emitEvent });
        } else {
          if (abstractControl.disabled) {
            abstractControl.patchValue(controlValue, { emitEvent });
          }
        }
      }
    });
  }

  setArrayValue(arrayIn: FormArray, value: any, emitEvent = true, updateDisabledOnly = false) {
    console.log('Default Array value');
    arrayIn.clear();
    if (value != null) {
      value.forEach((val, index) => {
        arrayIn.push(cloneDeep(arrayIn['rowTemplate']));
        this.setFormValue(<FormGroup>arrayIn.controls[index], val, emitEvent, updateDisabledOnly);
      });
    }    
    this.updateArrayKeys$.next();
  }

  operateOnControl(abstractControl: FormControl, operation: string) {
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
        this.operateOnControl(abstractControl, operation)
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
      case 'minLength': error = `Length must be greater than - ${error.value.requiredLength}`; break;
      case 'mustMatch': error = `Does not match - ${changeCase.sentenceCase(error.value.field)}`; break;
      case 'invalidEmailAddress': error = `Not a valid email address`; break;
      case 'rangeMax': error = `Must be less than - ${error.value.max}`; break;
      case 'rangeMin': error = `Must be greater than - ${error.value.min}`; break;
      case 'mustBeGreaterThan': error = `Must be greater than - ${changeCase.sentenceCase(error.value.field)}`; break;
      case 'mustBeLessThan': error = `Must be less than - ${changeCase.sentenceCase(error.value.field)}`; break;
      case 'collectionRangeMax': error = `Must be ${error.value.maxCount} or less rows`; break;
      case 'collectionRangeMin': error = `Must be ${error.value.minCount} or more rows`; break;
      default: break;
    }
    return error;
  }

  getMediaSize(): string {
    if (window.innerWidth >= this._config.mediaMedium) {
      return MediaSize.Large;
    } else if (window.innerWidth >= this._config.mediaMedium && window.innerWidth < this._config.mediaLarge) {
      return MediaSize.Medium;
    } else {
      return MediaSize.Small;
    }
  }

}
