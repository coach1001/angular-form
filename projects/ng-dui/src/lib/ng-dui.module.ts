import { NgModule, ModuleWithProviders } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfigService } from './services/ng-dui-config.service';
import { DuiFlowModule } from './dui-flow/dui-flow.module';
import { StepGuard } from './guards/step.guard';
import { FlowGuard } from './guards/flow.guard';
import { ModuleGuard } from './guards/module.guard';
import { DuiTasksModule } from './dui-tasks/dui-tasks.module';

@NgModule({
  declarations: [],
  imports: [
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule,
    DuiTasksModule
  ],
  exports: [
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule,
    DuiTasksModule
  ],
  providers: [
    NgDuiConfigService,
    StepGuard,
    FlowGuard,
    ModuleGuard
  ]
})
export class NgDuiModule {

  static forRoot(config: NgDuiConfigService): ModuleWithProviders<NgDuiModule> {
    return {
      ngModule: NgDuiModule,
      providers: [
        {
          provide: NgDuiConfigService,
          useValue: config
        }
      ]
    }
  }
}
