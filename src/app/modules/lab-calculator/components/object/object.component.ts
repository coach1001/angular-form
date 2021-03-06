import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
// import { DuiBaseObjectComponent, DuiFormGeneratorService, BorderType } from 'ng-dui';
import { DuiBaseObjectComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-object/dui-base-object.component';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent extends DuiBaseObjectComponent {

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
