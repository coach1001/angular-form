import { FormGroup, ValidationErrors } from '@angular/forms';

export function MustMatchValidator(controlName: string, metadata: any) {
  return (formGroup: FormGroup): ValidationErrors => {
    
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[metadata.targetField];

    if (control.value != matchingControl.value) {
      control.setErrors({ mustMatch: { field: metadata.targetField } });
      // control.markAsTouched();
    }

    return null;
  }
}
