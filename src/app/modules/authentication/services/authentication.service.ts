import { Injectable } from '@angular/core';
import { AuthService } from 'ngx-auth';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { map, switchMap, tap, catchError } from 'rxjs/operators';

interface AccessData {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements AuthService {

  constructor(
    private _http: HttpClient,
    private _tokenStorage: TokenStorageService
  ) { }

  public isAuthorized(): Observable<boolean> {
    return this._tokenStorage
      .getAccessToken()
      .pipe(map(token => !!token));
  }

  public getAccessToken(): Observable<string> {
    return this._tokenStorage.getAccessToken();
  }

  public refreshToken(): Observable<AccessData> {
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

  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401
  }

  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /*public login(): Observable<any> {
    return this._http.post(`http://localhost:3000/login`, {})
      .pipe(tap((tokens: AccessData) => this.saveAccessData(tokens)));
  }*/

  public logout(): void {
    this._tokenStorage.clear();
    location.reload(true);
  }

  private saveAccessData({ accessToken, refreshToken }: AccessData) {
    this._tokenStorage
      .setAccessToken(accessToken)
      .setRefreshToken(refreshToken);
  }
}
