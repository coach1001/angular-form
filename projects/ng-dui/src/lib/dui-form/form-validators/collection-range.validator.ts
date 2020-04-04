import { ValidationErrors, AbstractControl } from '@angular/forms';

export function CollectionRangeValidator(controlName: string, metadata: any) {  
  return (control: AbstractControl): ValidationErrors => {        
    if (control.value != null && Array.isArray(control.value)) {
      if (control.value.length > metadata.maxCount) {
        return { collectionRangeMax: { maxCount: metadata.maxCount } };
      } else if (control.value.length < metadata.minCount) {
        return { collectionRangeMin: { minCount: metadata.minCount } };
      }
    }
    return null;
  }
}
