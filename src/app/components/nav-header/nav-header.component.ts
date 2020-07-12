import { Component, OnInit, OnDestroy } from '@angular/core';
import { DuiFormDataService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-data.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../modules/authentication/services/authentication.service';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();
  isLoggedIn: boolean

  constructor(
    private _fds: DuiFormDataService,
    private _rt: Router,
    private _as: AuthenticationService) {
  }

  ngOnInit(): void {
    this._as.isLoggedIn$
      .pipe(
        filter(val => val != null),
        takeUntil(this._destroy$)
      ).subscribe(val => {                
        this.isLoggedIn = val;
      });
  }

  gotoRegistration(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/account/user-registration']);
  }

  gotoLogin(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/account/user-login']);
  }

  gotoUserEdit(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/account/user-edit']);
  }

  gotoChart(): void {
    this._rt.navigate(['charting']);
  }

  gotoA1(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/tmh1/a1']);
  }

  gotoA2A3A4(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/tmh1/a2a3a4']);
  }

  gotoA7(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/tmh1/a7']);
  }

  gotoTestFlow(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/test/test-flow']);
  }

  gotoTestReport(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/reports/tmh1-main-report']);
  }

  gotoSimpleFlow(): void {
    this._fds.clearFlowOnNextGet$.next(true);
    this._rt.navigate(['flow/test/simple-flow']);
  }

  logout(): void {
    this._as.logout();
    this._rt.navigate(['flow/account/user-login']);
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

}
