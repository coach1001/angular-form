import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { FgFlowUiModule } from './modules/fg-flow-ui/fg-flow-ui.module';
import { AccountModule } from './modules/account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { NgDuiModule } from 'projects/ng-dui/src/lib/ng-dui.module';
import { AccountDuiModule } from './modules/account-dui/account-dui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    NgDuiModule.forRoot({
      flowConfigSystem: 'portal',
      production: false
    }),
    // FgFlowUiModule,
    // AccountModule,
    AccountDuiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
