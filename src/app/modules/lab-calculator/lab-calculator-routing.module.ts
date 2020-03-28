import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleGuard } from 'ng-dui';
import { DuiDynamicComponent } from 'ng-dui';
import { FlowGuard } from 'ng-dui';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';

const routes: Routes = [
  {
    path: 'flow/account',
    component: LabCalculatorContainerComponent,
    canActivate: [ModuleGuard],
    data: {
      module: 'account',
    },
    children: [
      {
        path: '**',
        data: {
          module: 'account',
          staticComponents: [
            { name: 'done', }                      
          ]
        },
        canActivate: [FlowGuard],
        component: DuiDynamicComponent,
      }
    ]
  },
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
