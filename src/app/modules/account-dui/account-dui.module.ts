import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountDuiContainerComponent } from './components/account-dui-container/account-dui-container.component';
import { AccountDuiRoutingModule } from './account-dui-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { DuiComponentsModule } from 'projects/ng-dui/src/lib/dui-components/dui-components.module';

@NgModule({
  declarations: [
    AccountDuiContainerComponent
  ],
  imports: [
    CommonModule,
    AccountDuiRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    DuiComponentsModule
  ],
  entryComponents: [
    AccountDuiContainerComponent 
  ],
  exports: [
    AccountDuiContainerComponent    
  ]
})
export class AccountDuiModule { }
