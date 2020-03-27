import { NgModule, ModuleWithProviders } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfig } from './config/ng-dui.config';
import { NgDuiConfigService } from './services/ng-dui-config.service';
import { DuiFlowModule } from './dui-flow/dui-flow.module';

@NgModule({
  declarations: [],
  imports: [
    DuiFlowModule,
    DuiFormModule,    
    DuiComponentsModule    
  ],
  exports: [
    DuiFlowModule,
    DuiFormModule,
    DuiComponentsModule    
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
