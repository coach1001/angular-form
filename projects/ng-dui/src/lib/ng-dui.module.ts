import { NgModule, ModuleWithProviders } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfigService } from './services/ng-dui-config.service';
import { DuiFlowModule } from './dui-flow/dui-flow.module';
import { DuiAngularMaterialComponentsModule } from './dui-angular-material-components/dui-angular-material-components.module';
import { StepGuard } from './guards/step.guard';
import { FlowGuard } from './guards/flow.guard';
import { ModuleGuard } from './guards/module.guard';

@NgModule({
  declarations: [],
  imports: [
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule,
    DuiAngularMaterialComponentsModule
  ],
  exports: [
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule,
    DuiAngularMaterialComponentsModule
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
