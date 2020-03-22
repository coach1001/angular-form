import { NgModule, ModuleWithProviders } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfig } from './config/ng-dui.config';
import { NgDuiConfigService } from './services/ng-dui-config.service';
import { DuiFlowModule } from './dui-flow/dui-flow.module';
import { DuiAngularMaterialComponentsModule } from './dui-angular-material-components/dui-angular-material-components.module';

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
})
export class NgDuiModule {

  static forRoot(config: NgDuiConfig): ModuleWithProviders<NgDuiModule> {
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
