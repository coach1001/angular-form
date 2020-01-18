import { Component } from '@angular/core';
import { DuiBaseObjectComponent } from '../../base/dui-base-object/dui-base-object.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  selector: 'dui-default-object',
  templateUrl: './dui-default-object.component.html',
  styleUrls: ['./dui-default-object.component.scss']
})
export class DuiDefaultObjectComponent extends DuiBaseObjectComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _crs_: DuiComponentsRegistryService) {
    super(_fgs_, _crs_);
  }
}
