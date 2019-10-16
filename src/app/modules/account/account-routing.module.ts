import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountContainerComponent } from './components/account-container/account-container.component';
import { ModuleGuard } from '../fg-flow-ui/guards/module.guard';
import { FgDynamicFormComponent } from '../fg-flow-ui/components/fg-dynamic-form/fg-dynamic-form.component';

const routes: Routes = [
  {
    path: 'account',
    component: AccountContainerComponent,
    canActivate: [ModuleGuard],
    data: {
      module: 'account',
    },
    children: [
      {
        path: '**',
        component: FgDynamicFormComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
