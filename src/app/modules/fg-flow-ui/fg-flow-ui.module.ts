import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicModule } from 'ng-dynamic-component';
import { FgGroupComponent } from './components/fg-group/fg-group.component';
import { FgArrayComponent } from './components/fg-array/fg-array.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { FormGeneratorService } from './services/form-generator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FgTextControlComponent } from './controls/fg-text-control/fg-text-control.component';
import { FgNumberControlComponent } from './controls/fg-number-control/fg-number-control.component';
import { FgRadioGroupControlComponent } from './controls/fg-radio-group-control/fg-radio-group-control.component';
import { ElementDirective } from './directives/element.directive';

@NgModule({
  declarations: [
    FgGroupComponent,
    FgArrayComponent,
    FgTextControlComponent,
    FgNumberControlComponent,
    FgRadioGroupControlComponent,
    ElementDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DynamicModule.withComponents([
      FgGroupComponent,
      FgArrayComponent,
      
      FgTextControlComponent,
      FgNumberControlComponent,
      FgRadioGroupControlComponent
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
export class FgFlowUiModule {}
