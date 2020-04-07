import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('accessToken');
    return of(token);
  }

  getSyncAccessToken(): string {
    const token: string = <string>localStorage.getItem('accessToken');
    return token;
  }

  getSyncRoles(): string[] {
    const roles = JSON.parse(localStorage.getItem('roles')) as string[];
    return roles;
  }

  getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return of(token);
  }

  setAccessToken(token: string): TokenStorageService {
    localStorage.setItem('accessToken', token);
    return this;
  }

  setRoles(roles: string[]): TokenStorageService {
    localStorage.setItem('roles', JSON.stringify(roles));
    return this;
  }

  setRefreshToken(token: string): TokenStorageService {
    localStorage.setItem('refreshToken', token);
    return this;
  }

  clear() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('roles');
  }
}
