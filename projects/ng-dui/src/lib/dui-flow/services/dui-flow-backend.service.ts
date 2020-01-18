import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlowData } from '../../dui-form/services/dui-form-data.service';

@Injectable({
  providedIn: 'root'
})
export class DuiFlowBackendService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  runTask(data: IFlowData) {
    return this._httpClient.post('http://localhost:4200', data).toPromise();
  }  
}
