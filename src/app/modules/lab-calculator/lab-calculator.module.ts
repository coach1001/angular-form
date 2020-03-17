import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { DuiComponentsModule } from 'projects/ng-dui/src/lib/dui-components/dui-components.module';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';
import { LabCalculatorRoutingModule } from './lab-calculator-routing.module';


@NgModule({
  declarations: [
    LabCalculatorContainerComponent    
  ],
  imports: [
    CommonModule,
    LabCalculatorRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    DuiComponentsModule
  ],
  entryComponents: [
    LabCalculatorContainerComponent     
  ]
})
export class LabCalculatorModule { }
