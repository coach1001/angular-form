import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiTaskRegistryService } from './services/dui-task-registry.service';

@NgModule({  
  imports: [
    CommonModule
  ],
  providers: [
    DuiTaskRegistryService
  ]
})
export class DuiTasksModule { }
