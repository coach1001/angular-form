import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { DuiComponentsModule } from 'ng-dui';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';
import { LabCalculatorRoutingModule } from './lab-calculator-routing.module';

@NgModule({
  declarations: [
    LabCalculatorContainerComponent    
  ],
  imports: [
    CommonModule,
    LabCalculatorRoutingModule,
    MaterialModule,
    DuiComponentsModule
  ],
  entryComponents: [
    LabCalculatorContainerComponent     
  ]
})
export class LabCalculatorModule { }
