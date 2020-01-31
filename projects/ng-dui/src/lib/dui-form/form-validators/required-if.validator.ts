import { FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DuiFormGeneratorService } from '../services/dui-form-generator.service';
import cloneDeep from 'lodash-es/cloneDeep';

// custom validator to check that two fields match
export function RequiredIf(controlName: string, metadata: any, fgs: DuiFormGeneratorService) {
  return (formGroup: FormGroup): ValidationErrors => {

    const requiredIfControl = formGroup.controls[controlName];
    const triggerControl = formGroup.controls[metadata.triggerField];

    if (triggerControl.value != null && triggerControl.value.toString() === metadata.triggerValue) {
      const validators = cloneDeep(requiredIfControl['element'].originalValidators);
      validators.push(Validators.required);
      requiredIfControl.clearValidators();
      requiredIfControl.setValidators(validators);
      requiredIfControl.updateValueAndValidity({ onlySelf: true });
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
