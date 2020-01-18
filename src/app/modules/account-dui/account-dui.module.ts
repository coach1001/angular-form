import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDuiContainerComponent } from './components/account-dui-container/account-dui-container.component';
import { AccountDuiRoutingModule } from './account-dui-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AccountDuiStepperComponent } from './components/account-dui-stepper/account-dui-stepper.component';

@NgModule({
  declarations: [
    AccountDuiContainerComponent,
    AccountDuiStepperComponent
  ],
  imports: [
    CommonModule,
    AccountDuiRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  entryComponents: [
    AccountDuiContainerComponent,
    AccountDuiStepperComponent    
  ],
  exports: [
    AccountDuiContainerComponent,
    AccountDuiStepperComponent    
  ]
})
export class AccountDuiModule { }
