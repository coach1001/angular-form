import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(
    // TODO: private loadingService: LoadingService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.totalRequests++;
    console.log('ADD REQUEST')
    // TODO: this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        console.log('REMOVE REQUEST')
        this.totalRequests--;
        if (this.totalRequests === 0) {
          // TODO: this.loadingService.setLoading(false);
        }
      })
    );
  }
}