import { FormGroup, ValidationErrors } from '@angular/forms';

export function MustBeGreaterThanValidator(controlName: string, metadata: any) {
  return (formGroup: FormGroup): ValidationErrors => {
 
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[metadata.targetField];
    
    if (parseFloat(control.value) < parseFloat(matchingControl.value)) {
      control.setErrors({ mustBeGreaterThan: { field: metadata.targetField } });      
    } else if (control.errors) {
      delete control.errors.mustMatch;
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }
    return null;
  }
}
