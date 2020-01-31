import { ValidationErrors, AbstractControl } from '@angular/forms';

export function Required(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {

    if (control.errors && !control.errors.required) {
      return;
    }

    if(control.value != null && Array.isArray(control.value)) {
      if (control.value.length === 0) {
        return { required: true };
      } else {
        control.setErrors(null);
      }
    } else {
      if (control.value == null || control.value.toString() === '') {
        return { required: true };
      } else {
        control.setErrors(null);
      }
    }

    return;
  }
}
