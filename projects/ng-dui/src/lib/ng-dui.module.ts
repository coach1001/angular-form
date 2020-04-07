import { NgModule, ModuleWithProviders } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfigService } from './services/ng-dui-config.service';
import { DuiFlowModule } from './dui-flow/dui-flow.module';
import { StepGuard } from './guards/step.guard';
import { FlowGuard } from './guards/flow.guard';
import { ModuleGuard } from './guards/module.guard';
import { DuiTasksModule } from './dui-tasks/dui-tasks.module';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RoleGuard } from './guards/role.guard';

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
    ModuleGuard,
    AuthenticationGuard,
    RoleGuard
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
        },
        {
          provide: AuthenticationGuard,
          useClass: config != null && config.authenticationGuard != null ? config.authenticationGuard : AuthenticationGuard
        },
        {
          provide: RoleGuard,
          useClass: config != null && config.roleGuard != null ? config.roleGuard : RoleGuard
        }
      ]
    }
  }
}
