import { ValidationErrors, AbstractControl } from '@angular/forms';

export function RangeValidator(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {

    if (control.value != null && Array.isArray(control.value)) {
      if (control.value.length > metadata.max) {
        return { rangeMaxArray: { max: metadata.max } };
      } else if (control.value.length < metadata.min) {
        return { rangeMinArray: { min: metadata.min } };
      }
    } else if (control.value != null && Number.parseFloat(control.value)) {
      if (control.value > metadata.max) {
        return { rangeMax: { max: metadata.max } };
      } else if (control.value < metadata.min) {
        return { rangeMin: { min: metadata.min } };
      }
    }
    return null;

  }
}
