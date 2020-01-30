import { FormGroup, ValidationErrors } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, metadata: any) {
    return (formGroup: FormGroup): ValidationErrors => {
        /*const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value != matchingControl.value) {
            matchingControl.setErrors({ mustMatch: { value: controlName } });
        } else {
            matchingControl.setErrors(null);
        }*/
        return;
    }
}
