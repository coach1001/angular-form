import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';
import { LabCalculatorRoutingModule } from './lab-calculator-routing.module';
import { ObjectComponent } from './components/object/object.component';
import { ArrayComponent } from './components/array/array.component';
import { TextFieldComponent } from './components/text-field/text-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NumberFieldComponent } from './components/number-field/number-field.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { SelectFieldComponent } from './components/select-field/select-field.component';
import { HiddenTextFieldComponent } from './components/hidden-text-field/hidden-text-field.component';
import { LabelDecoratorComponent } from './components/label-decorator/label-decorator.component';
import { BooleanFieldComponent } from './components/boolean-field/boolean-field.component';
import { LayoutService } from './services/layout.service';

// import { DuiComponentsModule, DuiComponentsRegistryService } from 'ng-dui';
import { DuiComponentsModule } from 'projects/ng-dui/src/lib/dui-components/dui-components.module';
import { DuiComponentsRegistryService } from 'projects/ng-dui/src/lib/dui-components/services/dui-components-registry.service';

@NgModule({
  declarations: [
    LabCalculatorContainerComponent,
    ObjectComponent,
    ArrayComponent,
    TextFieldComponent,
    NumberFieldComponent,    
    SelectFieldComponent,
    HiddenTextFieldComponent,
    LabelDecoratorComponent,
    BooleanFieldComponent    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DigitOnlyModule,
    LabCalculatorRoutingModule,
    DuiComponentsModule
  ],
  providers: [
    LayoutService
  ],
  entryComponents: [
    LabCalculatorContainerComponent
  ]
})
export class LabCalculatorModule {
  constructor(private _crs: DuiComponentsRegistryService) {
    _crs.addComponent('defaultObject', ObjectComponent);
    _crs.addComponent('defaultArray', ArrayComponent);
    _crs.addComponent('defaultText', TextFieldComponent);    
    _crs.addComponent('defaultNumber', NumberFieldComponent);    
    _crs.addComponent('defaultSelect', SelectFieldComponent);
    _crs.addComponent('defaultHideableText', HiddenTextFieldComponent);
    _crs.addComponent('defaultDecorator', LabelDecoratorComponent);
    _crs.addComponent('defaultBoolean', BooleanFieldComponent)
  }
}
