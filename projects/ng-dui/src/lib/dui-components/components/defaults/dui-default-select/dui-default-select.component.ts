import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-select',
  templateUrl: './dui-default-select.component.html',
  styleUrls: ['./dui-default-select.component.scss']
})
export class DuiDefaultSelectComponent extends DuiBaseControlComponent {

  constructor(private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
