import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDuiContainerComponent } from './components/account-dui-container/account-dui-container.component';
import { ModuleGuard } from 'projects/ng-dui/src/lib/guards/module.guard';
import { DuiDynamicComponent } from 'projects/ng-dui/src/lib/dui-components/components/dui-dynamic/dui-dynamic.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountDuiContainerComponent,
    canActivate: [ModuleGuard],
    data: {
      module: 'account',
    },
    children: [
      {
        path: '**',
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
