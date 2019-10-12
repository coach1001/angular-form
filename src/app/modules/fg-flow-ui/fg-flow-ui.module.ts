import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { FgControlComponent } from './components/fg-control/fg-control.component';
import { FgGroupComponent } from './components/fg-group/fg-group.component';
import { FgArrayComponent } from './components/fg-array/fg-array.component';
import { FgTextInputComponent } from 'src/app/controls/fg-text-input/fg-text-input.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormGeneratorService } from './services/form-generator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    FgControlComponent,
    FgGroupComponent,
    FgArrayComponent,
    FgTextInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DynamicModule.withComponents([
      FgControlComponent,
      FgGroupComponent,
      FgArrayComponent,
      FgTextInputComponent
    ]),
    DigitOnlyModule
  ],
  entryComponents: [
    FgGroupComponent
  ],
  providers: [
    FormGeneratorService
  ],
  exports: [
    FgGroupComponent
  ]
})
export class FgFlowUiModule  { }
