import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { DuiComponentsModule } from './dui-components/dui-components.module';
import { DuiFlowService } from './dui-flow/services/dui-flow.service';
import { DuiFormModule } from './dui-form/dui-form.module';
import { NgDuiConfig } from './config/ng-dui.config';
import { NgDuiConfigService } from './services/ng-dui-config.service';

@NgModule({
  declarations: [],
  imports: [
    DuiComponentsModule,    
    DuiFormModule
  ],
  exports: [
    DuiComponentsModule,    
    DuiFormModule
  ]
})
export class NgDuiModule { 

  static forRoot(config: NgDuiConfig): ModuleWithProviders {
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
