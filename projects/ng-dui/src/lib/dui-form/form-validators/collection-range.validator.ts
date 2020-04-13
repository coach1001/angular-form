import { ValidationErrors, AbstractControl } from '@angular/forms';
import { ArrayOperation } from '../services/dui-array-operation.enum';

export function CollectionRangeValidator(controlName: string, metadata: any) {
  return (control: AbstractControl): ValidationErrors => {
    if (control.value != null && Array.isArray(control.value)) {
      const actualRows = control.value.filter(row => row.operation__ !== ArrayOperation.Remove);      
      if (actualRows.length > metadata.maxCount) {
        return { collectionRangeMax: { maxCount: metadata.maxCount } };
      } else if (actualRows.length < metadata.minCount) {
        return { collectionRangeMin: { minCount: metadata.minCount } };
      }
    }
    return null;
  }
}
