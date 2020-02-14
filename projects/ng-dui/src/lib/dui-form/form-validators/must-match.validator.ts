import { FormGroup, ValidationErrors } from '@angular/forms';

export function MustMatchValidator(controlName: string, metadata: any) {
  return (formGroup: FormGroup): ValidationErrors => {
 
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[metadata.targetField];

    if (control.value != matchingControl.value) {
      control.setErrors({ mustMatch: { field: metadata.targetField } });      
    } else if (control.errors) {
      delete control.errors.mustMatch;
      control.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    }

    return null;
  }
}
