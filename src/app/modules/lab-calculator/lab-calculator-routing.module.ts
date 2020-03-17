import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleGuard } from 'projects/ng-dui/src/lib/guards/module.guard';
import { DuiDynamicComponent } from 'projects/ng-dui/src/lib/dui-components/components/dui-dynamic/dui-dynamic.component';
import { FlowGuard } from 'projects/ng-dui/src/lib/guards/flow.guard';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';

const routes: Routes = [
  {
    path: 'flow/tmh1',
    component: LabCalculatorContainerComponent,
    canActivate: [ModuleGuard],
    data: {
      module: 'tmh1',
    },
    children: [
      {
        path: '**',
        data: {
          module: 'tmh1',
          staticComponents: [
            { name: 'done', }                      
          ]
        },
        canActivate: [FlowGuard],
        component: DuiDynamicComponent,
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabCalculatorRoutingModule { }
