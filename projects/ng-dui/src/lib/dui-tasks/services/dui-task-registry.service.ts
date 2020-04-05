import { Injectable, Injector, Type } from '@angular/core';
import { IDuiTaskRegistryItem } from './dui-task-registry-item.model';
import { DuiTask } from './dui-task.model';

@Injectable({
  providedIn: 'root'
})
export class DuiTaskRegistryService {  
  
  private readonly _registry: IDuiTaskRegistryItem[] = [];

  constructor(private injector: Injector) {
  }

  public addTask(key: string, value: Type<DuiTask>): void {
    this._registry.push(<IDuiTaskRegistryItem>{
      key,
      value
    });
  }

  public getTask(key: string): DuiTask | null {
    const task = this._registry.find(item => item.key === key);    
    if (task.value) {
      return this.injector.get<DuiTask>(task.value);
    }
    return null;
  }
}




