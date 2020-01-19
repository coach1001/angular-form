import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { FormDataService } from './modules/fg-flow-ui/services/form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _formData: FormDataService,
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
    this._router.navigateByUrl('route/flow/account/passwordReset');
  }
  
}
