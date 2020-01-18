import { Component } from '@angular/core';
import { DuiBaseArrayComponent } from '../../base/dui-base-array/dui-base-array.component';
import { DuiFormGeneratorService } from '../../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-array',
  templateUrl: './dui-default-array.component.html',
  styleUrls: ['./dui-default-array.component.scss']
})
export class DuiDefaultArrayComponent extends DuiBaseArrayComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}
