import { ValidationErrors, AbstractControl } from '@angular/forms';

export function MinLengthValidator(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {

    if (control.value != null && Array.isArray(control.value)) {
      if (control.value.length < metadata.length) {
        return { minLength: { requiredLength: metadata.length } };
      }
    } else {
      const stringValue = control.value != null ? control.value.toString() : '';
      if (stringValue.length < metadata.length) {
        return { minLength: { requiredLength: metadata.length } };
      }
    }

    return null;
  }
}
