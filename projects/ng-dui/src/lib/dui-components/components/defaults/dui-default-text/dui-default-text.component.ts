import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  selector: 'dui-default-text',
  templateUrl: './dui-default-text.component.html',
  styleUrls: ['./dui-default-text.component.scss']
})
export class DuiDefaultTextComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _crs_: DuiComponentsRegistryService) {
    super(_fgs_, _crs_);
  }

}
