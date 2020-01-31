import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { DuiFormDataService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _formData: DuiFormDataService,
    private _router: Router) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  gotoRegistration(): void {
    this._formData.clearFlowOnNextGet$.next(true);
    this._router.navigateByUrl('route/flow/account/registration');
  }

  gotoResetPassword(): void {
    this._formData.clearFlowOnNextGet$.next(true);
    //this._router.navigateByUrl('route/flow/account/passwordReset', <NavigationExtras>{
    //  queryParamsHandling: 'preserve'
    //});
    this._router.navigate(['route/flow/account/passwordReset'], { queryParamsHandling: 'merge' });
  }

}
