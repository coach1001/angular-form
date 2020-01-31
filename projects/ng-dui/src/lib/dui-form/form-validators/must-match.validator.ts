import { FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, metadata: any) {
  return (formGroup: FormGroup): ValidationErrors => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[metadata.targetField];

    if (control.errors && !control.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value != matchingControl.value) {
      control.setErrors({ mustMatch: { field: metadata.targetField } });
      control.markAsTouched();
    } else {
      control.setErrors(null);
    }

    return;
  }
}
