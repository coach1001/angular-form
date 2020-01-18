import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-datetime',
  templateUrl: './dui-default-datetime.component.html',
  styleUrls: ['./dui-default-datetime.component.scss']
})
export class DuiDefaultDatetimeComponent extends DuiBaseControlComponent {

  constructor(private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
