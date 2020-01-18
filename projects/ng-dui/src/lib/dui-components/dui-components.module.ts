import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiBaseObjectComponent } from './components/base/dui-base-object/dui-base-object.component';
import { DuiBaseArrayComponent } from './components/base/dui-base-array/dui-base-array.component';
import { DuiBaseControlComponent } from './components/base/dui-base-control/dui-base-control.component';
import { DynamicAnchorDirective } from './directives/dynamic-anchor.directive';
import { DuiDynamicComponent } from './components/dui-dynamic/dui-dynamic.component';
import { DuiDefaultObjectComponent } from './components/defaults/dui-default-object/dui-default-object.component';
import { DuiDefaultArrayComponent } from './components/defaults/dui-default-array/dui-default-array.component';
import { DuiDefaultTextComponent } from './components/defaults/dui-default-text/dui-default-text.component';
import { DuiDefaultBooleanComponent } from './components/defaults/dui-default-boolean/dui-default-boolean.component';
import { DuiDefaultNumberComponent } from './components/defaults/dui-default-number/dui-default-number.component';
import { DuiDefaultSelectComponent } from './components/defaults/dui-default-select/dui-default-select.component';
import { DuiDefaultMultiselectComponent } from './components/defaults/dui-default-multiselect/dui-default-multiselect.component';
import { DuiDefaultDatetimeComponent } from './components/defaults/dui-default-datetime/dui-default-datetime.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { DuiComponentsRegistryService } from './services/dui-components-registry.service';
import { DuiFormComponent } from './components/dui-form/dui-form.component';
import { DuiFormModule } from '../dui-form/dui-form.module';
import { DuiFlowModule } from '../dui-flow/dui-flow.module';

@NgModule({
  declarations: [
    DynamicAnchorDirective,
    DuiBaseObjectComponent,
    DuiBaseArrayComponent,
    DuiBaseControlComponent,

    DuiDynamicComponent,
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent,
    DuiFormComponent

  ],
  imports: [
    CommonModule,    
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    DigitOnlyModule,
    DuiFormModule,
    DuiFlowModule   
  ],
  entryComponents: [
    DuiDynamicComponent,
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent
  ],
  exports: [
    DynamicAnchorDirective,
    DuiBaseObjectComponent,
    DuiBaseArrayComponent,
    DuiBaseControlComponent,

    DuiDynamicComponent,
    DuiDefaultObjectComponent,
    DuiDefaultArrayComponent,
    DuiDefaultTextComponent,
    DuiDefaultBooleanComponent,
    DuiDefaultNumberComponent,
    DuiDefaultSelectComponent,
    DuiDefaultMultiselectComponent,
    DuiDefaultDatetimeComponent    
  ],
  providers: [
    DuiComponentsRegistryService
  ]
})
export class DuiComponentsModule { 
  constructor(private _crs: DuiComponentsRegistryService) {
    
    _crs.addComponent('defaultObject', DuiDefaultObjectComponent);
    _crs.addComponent('defaultArray', DuiDefaultArrayComponent);
    
    _crs.addComponent('defaultText', DuiDefaultTextComponent);
    _crs.addComponent('defaultBoolean', DuiDefaultBooleanComponent);
    _crs.addComponent('defaultNumber', DuiDefaultNumberComponent);
    _crs.addComponent('defaultSelect', DuiDefaultSelectComponent);
    _crs.addComponent('defaultMultiselect', DuiDefaultMultiselectComponent);
    _crs.addComponent('defaultDatetime', DuiDefaultDatetimeComponent);
    
  }

}
