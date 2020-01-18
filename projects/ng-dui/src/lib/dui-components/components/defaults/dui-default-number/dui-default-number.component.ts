import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-number',
  templateUrl: './dui-default-number.component.html',
  styleUrls: ['./dui-default-number.component.scss']
})
export class DuiDefaultNumberComponent extends DuiBaseControlComponent {

  constructor(private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
