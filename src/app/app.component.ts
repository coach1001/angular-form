import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
// import { DuiFormDataService } from 'ng-dui';
import { DuiFormDataService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  private _destroy$: Subject<void> = new Subject<void>();
  isShown: boolean = false;

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

    this._router.navigate(['flow/account/user-registration'], { queryParamsHandling: 'merge' });
  }

  gotoLogin(): void {
    this._formData.clearFlowOnNextGet$.next(true);
    this._router.navigate(['flow/account/user-login'], { queryParamsHandling: 'merge' });
  }
  
  gotoChart(): void {    
    this._router.navigate(['charting']);
  }

  gotoA1(): void {    
    this._router.navigate(['flow/tmh1/a1'], { queryParamsHandling: 'merge' });
  }

  gotoTestFlow(): void {
    this._router.navigate(['flow/tmh1/test-flow'], { queryParamsHandling: 'merge' });
  }
}
