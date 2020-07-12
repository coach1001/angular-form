import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartCustomComponent } from './components/chart-custom/chart-custom.component';

const routes: Routes = [
  {
    path: 'charting',
    pathMatch: 'full',
    component: ChartCustomComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'ignore' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
