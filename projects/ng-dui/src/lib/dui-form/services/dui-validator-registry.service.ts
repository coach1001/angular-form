import { Injectable } from '@angular/core';
import { IDuiValidatorRegistryItem } from './dui-validator-registry.model';

@Injectable({
  providedIn: 'root'
})
export class DuiValidatorRegistryService {

  private _registry: IDuiValidatorRegistryItem[] = [];

  constructor() { }

  addValidatorFn(key: string, value: any) {
    this._registry.push(<IDuiValidatorRegistryItem>{
      key,
      value
    });
  }

  getValidatorFn(key: string): any {
    const item = this._registry.find(item => item.key === key);
    if (item != null) {
      return item.value;
    }
  }
}
