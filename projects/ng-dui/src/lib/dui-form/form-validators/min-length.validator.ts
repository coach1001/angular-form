import { ValidationErrors, AbstractControl } from '@angular/forms';

export function MinLength(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {

    if (control.errors && !control.errors.minLength) {
      return;
    }

    if (control.value != null && Array.isArray(control.value)) {
      if (control.value.length < metadata.length) {
        return { minLength: { requiredLength: metadata.length } };
      } else {
        control.setErrors(null);
      }
    } else {
      const stringValue = control.value != null ? control.value.toString() : '';
      if (stringValue.length < metadata.length) {
        return { minLength: { requiredLength: metadata.length } };
      } else {
        control.setErrors(null);
      }
    }

    return;
  }
}
