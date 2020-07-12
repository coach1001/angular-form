import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiFormGeneratorService } from './services/dui-form-generator.service';
import { DuiFormDataService } from './services/dui-form-data.service';
import { DuiValidatorRegistryService } from './services/dui-validator-registry.service';
import { MustMatchValidator } from './form-validators/must-match.validator';
import { RequiredIfValidator } from './form-validators/required-if.validator';
import { RequiredValidator } from './form-validators/required.validator';
import { MinLengthValidator } from './form-validators/min-length.validator';
import { EmailAddressValidator } from './form-validators/email-address.validator';
import { RangeValidator } from './form-validators/range.validator';
import { MustBeGreaterThanValidator } from './form-validators/must-be-greater-than.validator';
import { MustBeLessThanValidator } from './form-validators/must-be-less-than.validator';
import { CollectionRangeValidator } from './form-validators/collection-range.validator';

@NgModule({
  declarations: [],
  imports: [
    CommonModule    
  ],
  providers: [
    DuiValidatorRegistryService,
    DuiFormGeneratorService,
    DuiFormDataService
  ]
})
export class DuiFormModule {

  constructor(private _vrs: DuiValidatorRegistryService) {
    _vrs.addValidatorFn('required', RequiredValidator);
    _vrs.addValidatorFn('minLength', MinLengthValidator);
    _vrs.addValidatorFn('mustMatch', MustMatchValidator);
    _vrs.addValidatorFn('requiredIf', RequiredIfValidator);
    _vrs.addValidatorFn('emailAddress', EmailAddressValidator);        
    _vrs.addValidatorFn('range', RangeValidator);    
    _vrs.addValidatorFn('mustBeGreaterThan', MustBeGreaterThanValidator);
    _vrs.addValidatorFn('mustBeLessThan', MustBeLessThanValidator);
    _vrs.addValidatorFn('collectionRange', CollectionRangeValidator);
  }

}
