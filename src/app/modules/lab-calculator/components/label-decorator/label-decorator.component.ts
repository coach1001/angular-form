import { Component } from '@angular/core';
// import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseControlComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-control/dui-base-control.component';

@Component({
  selector: 'app-label-decorator',
  templateUrl: './label-decorator.component.html',
  styleUrls: ['./label-decorator.component.scss']
})
export class LabelDecoratorComponent extends DuiBaseControlComponent {

  labelTextStyle = {};

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  ngOnInit() {
    let textAlign = '';
    let verticalAlign = '';
    switch (this.controlIn['metadata']?.textAlign) {
      case 'right': textAlign = 'flex-end'; break;
      case 'left': textAlign = 'flex-start'; break;
      case 'center': textAlign = 'center'; break;
      default: textAlign = 'center'; break;
    }
    switch (this.controlIn['metadata']?.verticalAlign) {
      case 'top': verticalAlign = 'flex-start'; break;
      case 'bottom': verticalAlign = 'flex-end'; break;
      default: verticalAlign = 'center'; break;
    }
    this.labelTextStyle = {
      'font-weight': '500',
      'display': 'flex',
      'padding': '5px',
      'align-items': verticalAlign,
      'justify-content': textAlign,
      'margin-bottom': 0
    }
  }
}
