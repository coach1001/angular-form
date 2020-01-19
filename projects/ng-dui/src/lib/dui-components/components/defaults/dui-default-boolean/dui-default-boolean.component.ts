import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  selector: 'dui-default-boolean',
  templateUrl: './dui-default-boolean.component.html',
  styleUrls: ['./dui-default-boolean.component.scss']
})
export class DuiDefaultBooleanComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
