import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './modules/authentication/services/authentication.service';
import { TokenStorageService } from './modules/authentication/services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _as: AuthenticationService,
    private _tss: TokenStorageService
  ) {
  }

  ngOnInit() {
    const token = this._tss.getSyncAccessToken();
    const roles = this._tss.getSyncRoles();
    if (token != null && roles != null) {
      this._as.saveAccessData({ accessToken: token, refreshToken: null, roles });
    } else if (token != null) {
      this._as.saveAccessData({ accessToken: token, refreshToken: null, roles: [] });
    }
  }

}
