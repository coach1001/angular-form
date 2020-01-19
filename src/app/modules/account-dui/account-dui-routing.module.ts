import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDuiContainerComponent } from './components/account-dui-container/account-dui-container.component';
import { ModuleGuard } from 'projects/ng-dui/src/lib/guards/module.guard';
import { DuiDynamicComponent } from 'projects/ng-dui/src/lib/dui-components/components/dui-dynamic/dui-dynamic.component';
import { FlowGuard } from 'projects/ng-dui/src/lib/guards/flow.guard';

const routes: Routes = [
  {
    path: 'flow/account',
    component: AccountDuiContainerComponent,
    canActivate: [ModuleGuard],
    data: {
      module: 'account',
    },
    children: [
      {
        path: '**',
        data: {
          module: 'account',
        },
        canActivate: [FlowGuard],        
        component: DuiDynamicComponent
      }
    ]    
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDuiRoutingModule { }
