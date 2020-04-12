import { FormGroup, ValidationErrors } from '@angular/forms';
import cloneDeep from 'lodash-es/cloneDeep';
import { RequiredValidator } from './required.validator';

// custom validator to check that two fields match
export function RequiredIfValidator(controlName: string, metadata: any) {

  return (formGroup: FormGroup): ValidationErrors => {    
    const requiredIfControl = formGroup.controls[controlName];
    const triggerControl = formGroup.controls[metadata.triggerField];
    if (triggerControl.value != null && triggerControl.value.toString().toLowerCase() === metadata.triggerValue.toString().toLowerCase()) {
      const validators = cloneDeep(requiredIfControl['element'].originalValidators);
      validators.push(RequiredValidator(controlName, { required: true }));
      requiredIfControl.clearValidators();
      requiredIfControl.setValidators(validators);
      requiredIfControl.updateValueAndValidity({ onlySelf: true });
      // TODO: Why is this here
      requiredIfControl.markAsTouched();
      requiredIfControl['element'].resetValidators = true;
    } else {
      if (requiredIfControl['element'].resetValidators) {
        requiredIfControl['element'].resetValidators = false;
        const validators = cloneDeep(requiredIfControl['element'].originalValidators);
        requiredIfControl.clearValidators();
        requiredIfControl.setValidators(validators);
        requiredIfControl.updateValueAndValidity({ onlySelf: true });
      }
    }
    return null;
  }
}
