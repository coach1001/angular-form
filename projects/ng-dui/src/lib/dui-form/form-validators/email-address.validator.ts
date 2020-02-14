import { ValidationErrors, AbstractControl } from '@angular/forms';

export function EmailAddressValidator(controlName: string, metadata: any) {

  return (control: AbstractControl): ValidationErrors => {

    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (control.value != null && control.value !== '' && !EMAIL_REGEXP.test(control.value)) {
      return { invalidEmailAddress: true };
    }

    return null;
  }
}
