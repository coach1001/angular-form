import { NgModule, ɵangular_packages_core_core_s } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiFormGeneratorService } from './services/dui-form-generator.service';
import { DuiFormDataService } from './services/dui-form-data.service';
import { DuiValidatorRegistryService } from './services/dui-validator-registry.service';
import { Validators } from '@angular/forms';
import { MustMatch } from './form-validators/must-match.validator';
import { RequiredIf } from './form-validators/required-if.validator';
import { Required } from './form-validators/required.validator';
import { MinLength } from './form-validators/min-length.validator';

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
    _vrs.addValidatorFn('required', Required);
    _vrs.addValidatorFn('minLength', MinLength);
    _vrs.addValidatorFn('mustMatch', MustMatch);
    _vrs.addValidatorFn('requiredIf', RequiredIf);
  }

}
