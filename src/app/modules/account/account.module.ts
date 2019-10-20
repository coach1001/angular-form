import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FgFlowUiModule } from '../fg-flow-ui/fg-flow-ui.module';

@NgModule({
  declarations: [AccountContainerComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    FgFlowUiModule
  ]
})
export class AccountModule { }
