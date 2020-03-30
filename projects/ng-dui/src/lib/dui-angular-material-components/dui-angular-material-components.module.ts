import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DuiFlowModule } from '../dui-flow/dui-flow.module';
import { DuiFormModule } from '../dui-form/dui-form.module';
import { DuiComponentsRegistryService } from '../dui-components/services/dui-components-registry.service';
import { DuiDefaultObjectComponent } from './components/dui-default-object/dui-default-object.component';
import { DuiDefaultArrayComponent } from './components/dui-default-array/dui-default-array.component';
import { DuiDefaultTextComponent } from './components/dui-default-text/dui-default-text.component';
import { DuiDefaultBooleanComponent } from './components/dui-default-boolean/dui-default-boolean.component';
import { DuiDefaultNumberComponent } from './components/dui-default-number/dui-default-number.component';
import { DuiDefaultSelectComponent } from './components/dui-default-select/dui-default-select.component';
import { DuiDefaultMultiselectComponent } from './components/dui-default-multiselect/dui-default-multiselect.component';
import { DuiDefaultDatetimeComponent } from './components/dui-default-datetime/dui-default-datetime.component';
import { DuiDefaultHideableTextComponent } from './components/dui-default-hideable-text/dui-default-hideable-text.component';
import { DuiStepperComponent } from './components/dui-stepper/dui-stepper.component';
import { DuiComponentsModule } from '../dui-components/dui-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DigitOnlyModule,
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule
  ],
  declarations: [        
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent,
    DuiDefaultHideableTextComponent,
    DuiStepperComponent,
  ],
  entryComponents: [    
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent,
    DuiDefaultHideableTextComponent,
    DuiStepperComponent,
  ],
  exports: [
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent,
    DuiDefaultHideableTextComponent,
    DuiStepperComponent,
  ],
  providers: [
    DuiComponentsRegistryService
  ],
})
export class DuiAngularMaterialComponentsModule {
  constructor(private _crs: DuiComponentsRegistryService) {
    _crs.addComponent('defaultObject', DuiDefaultObjectComponent);
    _crs.addComponent('defaultArray', DuiDefaultArrayComponent);
    _crs.addComponent('defaultText', DuiDefaultTextComponent);
    _crs.addComponent('defaultBoolean', DuiDefaultBooleanComponent);
    _crs.addComponent('defaultNumber', DuiDefaultNumberComponent);
    _crs.addComponent('defaultSelect', DuiDefaultSelectComponent);
    _crs.addComponent('defaultMultiselect', DuiDefaultMultiselectComponent);
    _crs.addComponent('defaultDatetime', DuiDefaultDatetimeComponent);
    _crs.addComponent('defaultHideableText', DuiDefaultHideableTextComponent);
  }
}
