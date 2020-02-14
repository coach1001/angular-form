import { ValidationErrors, AbstractControl } from '@angular/forms';

export function RequiredValidator(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {

    if(control.value != null && Array.isArray(control.value)) {
      if (control.value.length === 0) {
        return { required: true };
      }
    } else {
      if (control.value == null || control.value.toString() === '') {
        return { required: true };
      }
    }

    return null;
  }
}
