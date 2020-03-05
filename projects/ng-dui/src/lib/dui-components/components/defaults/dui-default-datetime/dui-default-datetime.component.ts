import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';
import { DuiComponentsRegistryService } from '../../../services/dui-components-registry.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'dui-default-datetime',
  templateUrl: './dui-default-datetime.component.html',
  styleUrls: ['./dui-default-datetime.component.scss']
})
export class DuiDefaultDatetimeComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  change(type: string, event: MatDatepickerInputEvent<Date>) {
    
  }
}
