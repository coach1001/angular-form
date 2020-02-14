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
  }

}
