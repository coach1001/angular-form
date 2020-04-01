import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ChartCustomComponent } from './components/chart-custom/chart-custom.component';
import { ChartModule } from 'angular-highcharts';
import { LabCalculatorModule } from './modules/lab-calculator/lab-calculator.module';
import { LoadingInterceptor } from './modules/lab-calculator/interceptors/loading.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgDuiModule } from 'ng-dui';
import { NgDuiModule } from 'projects/ng-dui/src/lib/ng-dui.module';

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
    NgbModule,
    NgDuiModule.forRoot({
      ...environment.flowsConfig,
      production: environment.production
    }),
    LabCalculatorModule,
    ChartModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
