import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiBaseObjectComponent } from './components/base/dui-base-object/dui-base-object.component';
import { DuiBaseArrayComponent } from './components/base/dui-base-array/dui-base-array.component';
import { DuiBaseControlComponent } from './components/base/dui-base-control/dui-base-control.component';
import { DynamicAnchorDirective } from './directives/dynamic-anchor.directive';
import { DuiDynamicComponent } from './components/dui-dynamic/dui-dynamic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    DuiFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,    
    DuiFlowModule,
    DuiFormModule,
  ],
  entryComponents: [
    DuiDynamicComponent,
    DuiFormComponent,
  ],
  exports: [
    DynamicAnchorDirective,
    DuiBaseObjectComponent,
    DuiBaseArrayComponent,
    DuiBaseControlComponent,
    DuiDynamicComponent,
    DuiFormComponent,
  ],
  providers: [
    DuiComponentsRegistryService
  ]
})
export class DuiComponentsModule { }
