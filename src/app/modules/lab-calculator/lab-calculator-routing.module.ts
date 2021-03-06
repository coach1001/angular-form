import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabCalculatorContainerComponent } from './components/lab-calculator-container/lab-calculator-container.component';
//import { ModuleGuard, FlowGuard, DuiDynamicComponent } from 'ng-dui';
import { ModuleGuard } from 'projects/ng-dui/src/lib/guards/module.guard';
import { FlowGuard } from 'projects/ng-dui/src/lib/guards/flow.guard';
import { DuiDynamicComponent } from 'projects/ng-dui/src/lib/dui-components/components/dui-dynamic/dui-dynamic.component';
import { ReportContainerComponent } from './components/report-container/report-container.component';

const routes: Routes = [
  {
    path: 'flow/account',
    component: LabCalculatorContainerComponent,
    canActivate: [ModuleGuard],
    runGuardsAndResolvers: 'always',
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
    runGuardsAndResolvers: 'always',
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
  },
  {
    path: 'flow/test',
    component: LabCalculatorContainerComponent,
    canActivate: [ModuleGuard],
    runGuardsAndResolvers: 'always',
    data: {
      module: 'test',
    },
    children: [
      {
        path: '**',
        data: {
          module: 'test',
          staticComponents: [
            { name: 'done' }                      
          ]
        },
        canActivate: [FlowGuard],
        component: DuiDynamicComponent,
      }
    ]
  },
  {
    path: 'flow/reports',
    component: ReportContainerComponent,
    canActivate: [ModuleGuard],
    runGuardsAndResolvers: 'always',
    data: {
      module: 'reports',
    },
    children: [
      {
        path: '**',
        data: {
          module: 'reports',
          staticComponents: [
            { name: 'done' }                      
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
