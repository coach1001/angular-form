import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDuiContainerComponent } from './components/account-dui-container/account-dui-container.component';
import { AccountDuiRoutingModule } from './account-dui-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { DuiComponentsModule } from 'projects/ng-dui/src/lib/dui-components/dui-components.module';
import { RegistrationDoneComponent } from './components/registration-done/registration-done.component';

@NgModule({
  declarations: [
    AccountDuiContainerComponent,
    RegistrationDoneComponent
  ],
  imports: [
    CommonModule,
    AccountDuiRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    DuiComponentsModule
  ],
  entryComponents: [
    AccountDuiContainerComponent,
    RegistrationDoneComponent 
  ]
})
export class AccountDuiModule { }
