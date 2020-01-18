import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuiFlowService } from './services/dui-flow.service';
import { DuiFlowBackendService } from './services/dui-flow-backend.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    DuiFlowService,
    DuiFlowBackendService
  ]
})
export class DuiFlowModule { }
