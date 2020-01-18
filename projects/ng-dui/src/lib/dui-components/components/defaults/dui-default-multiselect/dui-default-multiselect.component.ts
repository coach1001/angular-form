import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';

@Component({
  selector: 'dui-default-multiselect',
  templateUrl: './dui-default-multiselect.component.html',
  styleUrls: ['./dui-default-multiselect.component.scss']
})
export class DuiDefaultMultiselectComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _crs_: DuiComponentsRegistryService) {
    super(_fgs_, _crs_);
  }

}
