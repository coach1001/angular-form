import { Component } from '@angular/core';
import { DuiBaseObjectComponent } from 'ng-dui';
import { DuiFormGeneratorService } from 'ng-dui';

@Component({
  selector: 'app-label-decorator',
  templateUrl: './label-decorator.component.html',
  styleUrls: ['./label-decorator.component.scss']
})
export class LabelDecoratorComponent extends DuiBaseObjectComponent {

  labelTextStyle = {};

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  ngOnInit() {
    let textAlign = '';
    switch (this.controlIn['element'].metadata?.textAlign) {
      case 'right': textAlign = 'flex-end'; break;
      case 'left': textAlign = 'flex-start'; break;
      case 'center': textAlign = 'center'; break;
      default: textAlign = 'center'; break;
    }
    this.labelTextStyle = {
      'font-weight': 'bold',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': textAlign,
      'margin-bottom': 0
    }
  }

}
