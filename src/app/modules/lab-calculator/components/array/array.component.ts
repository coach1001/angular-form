import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
// import { DuiBaseArrayComponent, DuiFormGeneratorService, BorderType } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseArrayComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-array/dui-base-array.component';


@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends DuiBaseArrayComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService,
    private _ls: LayoutService) {
    super(_fgs_);
  }

  get gridStyleParent(): object {    
    return this._ls.gridStyleParent(this.controlIn);
  }

  gridStyleChild(controlKey: string): object {
    return this._ls.gridStyleChild(controlKey, this.controlIn);
  }

  gridStyleDecorator(decorator) {
    return this._ls.gridStyleDecorator(decorator);
  }

  getBorder(borderConfig: string) {
    return this._ls.getBorder(borderConfig);
  }
}
