import { Component } from '@angular/core';
import { LayoutService } from '../../services/layout.service';
// import { DuiBaseArrayComponent, DuiFormGeneratorService, BorderType } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseArrayComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-array/dui-base-array.component';
import { Orientation } from 'projects/ng-dui/src/lib/dui-form/services/dui-orientation.enum';
import { FormArray, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.scss']
})
export class ArrayComponent extends DuiBaseArrayComponent {

  arrayOrientationStyle: {}
  rowOrientationStyle: {}
  deleteButtonStyle: {}
  vertical: boolean;

  constructor(
    private _esm: ErrorStateMatcher,
    private _fgs_: DuiFormGeneratorService,
    private _ls: LayoutService) {
    super(_fgs_);
  }

  customInit() {
    this.vertical = this.controlIn['element']['vertical'];
    const verticalRows = this.controlIn['element']['verticalRows'];
    if (this.vertical != null && this.vertical) {
      this.arrayOrientationStyle = {
        'display': 'grid',
        'grid-template-rows': '1fr',
        'grid-gap': '10px'
      };
      this.rowOrientationStyle = {
        'margin-bottom': '10px'
      };
      if (verticalRows != null && verticalRows > 0) {
        this.arrayOrientationStyle['grid-template-columns'] = `repeat(${verticalRows}, 1fr)`;
      } else {
        this.arrayOrientationStyle['grid-auto-flow'] = 'column';
      }
    } else {
      this.rowOrientationStyle = {
        'display': 'grid',
        'grid-template-columns': '1fr auto',
        'grid-template-rows': '1fr',        
        'margin-bottom': '10px'
      };
      this.arrayOrientationStyle = {
        'display': 'grid',
        'grid-template-rows': '1fr'        
      };
    }
    if (!this.vertical) {
      this.deleteButtonStyle = {
        'margin-top': '26px'
      };
    } else {
      this.deleteButtonStyle = {
        'margin-top': '10px'
      };
    }
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

  get error_() {
    return this._esm.isErrorState(<FormControl><any>this.controlIn, null) ? this.error : '';
  }

  get showAdd() {    
    if (this.controlIn['element']['maxRows'] === 0) {
      return true;
    } else {      
      return !(this.controlIn?.value?.length === this.controlIn['element']['maxRows']);
    }
  }

}
