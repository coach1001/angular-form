import { Component } from '@angular/core';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';

@Component({
  selector: 'dui-default-hideable-text',
  templateUrl: './dui-default-hideable-text.component.html',
  styleUrls: ['./dui-default-hideable-text.component.scss']
})
export class DuiDefaultHideableTextComponent extends DuiBaseControlComponent {

  hidden = true;

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _crs_: DuiComponentsRegistryService) {
    super(_fgs_, _crs_);
  }

}

