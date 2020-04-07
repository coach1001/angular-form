import { Injectable } from '@angular/core';
import { AuthService } from 'ngx-auth';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

interface AccessData {
  accessToken: string;
  refreshToken: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthService {

  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  roles$ = new BehaviorSubject<string[]>([]);

  constructor(
    private _http: HttpClient,
    private _tokenStorage: TokenStorageService
  ) { }

  isAuthorized(): Observable<boolean> {
    return this._tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }

  getAccessToken(): Observable<string> {
    return this._tokenStorage.getAccessToken();
  }

  refreshToken(): Observable<AccessData> {
    return this._tokenStorage
      .getRefreshToken()
      .pipe(
        switchMap((refreshToken: string) =>
          this._http.post(`http://localhost:3000/refresh`, { refreshToken })
        ),
        tap((tokens: AccessData) => {
          return this.saveAccessData(tokens);
        }),
        catchError((err) => {
          this.logout();
          return Observable.throw(err);
        })
      );
  }

  refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /*public login(): Observable<any> {
    return this._http.post(`http://localhost:3000/login`, {})
      .pipe(tap((tokens: AccessData) => this.saveAccessData(tokens)));
  }*/

  logout(): void {
    this._tokenStorage.clear();
    this.isLoggedIn$.next(false);
  }

  saveAccessData({ accessToken, roles }: AccessData) {
    this.isLoggedIn$.next(true);
    this.roles$.next(roles);
    this._tokenStorage
      .setAccessToken(accessToken)
      .setRoles(roles);
    //.setRefreshToken(refreshToken);

  }
}
