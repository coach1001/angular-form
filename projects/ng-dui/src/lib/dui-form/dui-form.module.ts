import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiFormGeneratorService } from './services/dui-form-generator.service';
import { DuiFormDataService } from './services/dui-form-data.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    DuiFormGeneratorService,
    DuiFormDataService
  ]
})
export class DuiFormModule { }
