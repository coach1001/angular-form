import { Component } from '@angular/core';
import { DuiBaseControlComponent } from '../../../dui-components/components/base/dui-base-control/dui-base-control.component';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-default-hideable-text',
  templateUrl: './dui-default-hideable-text.component.html',
  styleUrls: ['./dui-default-hideable-text.component.scss']
})
export class DuiDefaultHideableTextComponent extends DuiBaseControlComponent {

  hidden = true;

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

}

