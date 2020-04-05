import { DuiTask } from './dui-task.model';
import { Type } from '@angular/core';

export interface IDuiTaskRegistryItem {
  key: string,
  value: Type<DuiTask>
}
