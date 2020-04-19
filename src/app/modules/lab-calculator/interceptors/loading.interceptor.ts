import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private _totalRequests = 0;
  private spinnerTimeout;
  showSpinner$ = new BehaviorSubject<boolean>(false);

  constructor(
    // TODO: private loadingService: LoadingService
    private _spinner: NgxSpinnerService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._totalRequests += 1;
    if (!this.showSpinner$.value) {
      this.showSpinner$.next(true);
      this._spinner.show();
      this.spinnerTimeout = setTimeout(() => {
        this.resetInterceptor();
      }, environment.spinnerTimeout);
    }
    // TODO: this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this._totalRequests--;
        if (this._totalRequests === 0) {
          this.resetInterceptor();
        }
      })
    );
  }

  resetInterceptor() {
    if (this.showSpinner$.value) {
      clearTimeout(this.spinnerTimeout);
      this.showSpinner$.next(false);
      this._spinner.hide();
      this._totalRequests = 0;      
    }
  }
}