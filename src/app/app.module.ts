import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { NgDuiModule } from 'projects/ng-dui/src/lib/ng-dui.module';
import { AccountDuiModule } from './modules/account-dui/account-dui.module';
import { environment } from 'src/environments/environment';
import { ChartsModule } from 'ng2-charts';
import { ChartCustomComponent } from './components/chart-custom/chart-custom.component';

@NgModule({
  declarations: [
    AppComponent,    
    ChartCustomComponent
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
      ...environment.flowsConfig,
      production: environment.production
    }),
    AccountDuiModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
