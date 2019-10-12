import { FormGroup } from '@angular/forms';
import * as jexl from 'jexl';

// custom validator to check that two fields match
export function RequiredIf(controlName: string, expression: string) {
    return (formGroup: FormGroup) => {
        const requiredIfControl = formGroup.controls[controlName];
        const value = requiredIfControl.value;
        const groupValue = formGroup.getRawValue();

        if (requiredIfControl.errors && !requiredIfControl.errors.required) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        const expResult = jexl.evalSync(expression, groupValue);

        // set error on matchingControl if validation fails
        if (expResult && (value == null || value === '' || value.length === 0)) {
            requiredIfControl.setErrors({ required: true });
        } else {
            requiredIfControl.setErrors(null);
        }
    }
}
