import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../../dui-components/components/base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-multiselect',
  templateUrl: './dui-default-multiselect.component.html',
  styleUrls: ['./dui-default-multiselect.component.scss']
})
export class DuiDefaultMultiselectComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
