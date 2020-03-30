import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiComponentsModule, DuiComponentsRegistryService } from 'ng-dui';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';
import { LabCalculatorRoutingModule } from './lab-calculator-routing.module';
import { ObjectComponent } from './components/object/object.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { HiddenTextFieldComponent } from './components/hidden-text-field/hidden-text-field.component';
import { LabelDecoratorComponent } from './components/label-decorator/label-decorator.component';
import { SpacerComponent } from './components/spacer/spacer.component';

@NgModule({
  declarations: [
    LabCalculatorContainerComponent,
    ObjectComponent,
    TextFieldComponent,
    NumberFieldComponent,
    SelectFieldComponent,
    HiddenTextFieldComponent,
    LabelDecoratorComponent,
    SpacerComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    LabCalculatorRoutingModule,
    DuiComponentsModule
  ],
  entryComponents: [
    LabCalculatorContainerComponent
  ]
})
export class LabCalculatorModule { 
  constructor(private _crs: DuiComponentsRegistryService) {
    _crs.addComponent('defaultObject', ObjectComponent);
    _crs.addComponent('defaultText', TextFieldComponent);
    _crs.addComponent('defaultNumber', NumberFieldComponent);
    _crs.addComponent('defaultSelect', SelectFieldComponent);
    _crs.addComponent('defaultHideableText', HiddenTextFieldComponent);
    _crs.addComponent('defaultDecorator', LabelDecoratorComponent)
    _crs.addComponent('defaultSpacer', SpacerComponent)
    
  }
}
