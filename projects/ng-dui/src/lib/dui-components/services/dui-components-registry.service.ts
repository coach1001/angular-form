import { Injectable } from '@angular/core';
import { IDuiComponentRegistryItem } from './dui-components-registry.models';

@Injectable({
  providedIn: 'root'
})
export class DuiComponentsRegistryService {

  private _registry: IDuiComponentRegistryItem[] = [];

  constructor() { }

  addComponent(key: string, value: any) {
    this._registry.push(<IDuiComponentRegistryItem>{
      key,
      value
    });
  }

  getComponent(key: string): any {
    return this._registry.find(item => item.key === key).value;
  }

}
