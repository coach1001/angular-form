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
import { FgSwitchControlComponent } from './controls/fg-switch-control/fg-switch-control.component';
import { FgBaseElementComponent } from './components/fg-base-element/fg-base-element.component';
import { ModuleGuard } from './guards/module.guard';
import { FgDynamicFormComponent } from './components/fg-dynamic-form/fg-dynamic-form.component';
import { FgHiddenTextControlComponent } from './controls/fg-hidden-text-control/fg-hidden-text-control.component';
import { FgAutocompleteControlComponent } from './controls/fg-autocomplete-control/fg-autocomplete-control.component';
import { FgStepperComponent } from './components/fg-stepper/fg-stepper.component';

@NgModule({
  declarations: [
    ElementDirective,
    <any> FgBaseElementComponent,
    FgGroupComponent,
    FgArrayComponent,
    FgTextControlComponent,
    FgNumberControlComponent,
    FgRadioGroupControlComponent,
    FgSwitchControlComponent,
    FgDynamicFormComponent,
    FgHiddenTextControlComponent,
    FgAutocompleteControlComponent,
    FgStepperComponent
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
      FgRadioGroupControlComponent,
      FgSwitchControlComponent,
      FgHiddenTextControlComponent,
      FgAutocompleteControlComponent
    ]),
    DigitOnlyModule
  ],
  entryComponents: [
    FgDynamicFormComponent,
    FgStepperComponent
  ],
  providers: [
    FormGeneratorService,
    ModuleGuard
  ],
  exports: [
    FgDynamicFormComponent,
    FgStepperComponent
  ]
})
export class FgFlowUiModule {}
