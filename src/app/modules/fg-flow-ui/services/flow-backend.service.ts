import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlowData } from './form-data.service';

@Injectable({
  providedIn: 'root'
})
export class FlowBackendService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  runTask(data: IFlowData) {
    return this._httpClient.post('http://localhost:4200', data).toPromise();
  }  
}
