import { Component } from '@angular/core';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';
import { DuiBaseObjectComponent } from '../../../dui-components/components/base/dui-base-object/dui-base-object.component';

@Component({
  selector: 'dui-default-object',
  templateUrl: './dui-default-object.component.html',
  styleUrls: ['./dui-default-object.component.scss']
})
export class DuiDefaultObjectComponent extends DuiBaseObjectComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }
  
}
