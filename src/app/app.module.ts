import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
// import { NgDuiModule } from 'ng-dui';
import { NgDuiModule } from 'projects/ng-dui/src/lib/ng-dui.module';
import { AuthenticationGuard } from './modules/authentication/guards/authentication.guard';
import { RoleGuard } from './modules/authentication/guards/role.guard';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DigitOnlyModule } from '@uiowa/digit-only';

@NgModule({
  declarations: [
    AppComponent,
    ChartCustomComponent,
    NavHeaderComponent
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
      production: environment.production,
      authenticationGuard: AuthenticationGuard,
      roleGuard: RoleGuard
    }),
    NgxSpinnerModule,
    AuthenticationModule,
    LabCalculatorModule,
    ChartModule,
    DigitOnlyModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  ],
  entryComponents: [
    NavHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
