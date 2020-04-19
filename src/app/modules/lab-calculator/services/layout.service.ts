import { Injectable } from '@angular/core';
// import { DuiFormGeneratorService, BorderType } from 'ng-dui/ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { BorderType } from 'projects/ng-dui/src/lib/dui-form/services/dui-border.enum';
import { ElementType } from 'projects/ng-dui/src/lib/dui-form/services/dui-elements.enum';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(
    private _fgs: DuiFormGeneratorService
  ) { }

  gridStyleParent(controlIn): object {
    const gridConfig = controlIn['element']['gridConfig'];
    const positionConfig = controlIn['element']['positionConfig'];
    const mediaSize = this._fgs.getMediaSize();
    let gridStyle = {
      'display': 'grid',
      // padding: 
      //   controlIn['element'].elementType === ElementType.Object || controlIn['element'].elementType == ElementType.Array 
      //   ? '10px' : 0
    };
    if (controlIn['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(controlIn['element']['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if (gridConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-template-columns'] = gridConfig.large.column;
      gridStyle['grid-template-rows'] = gridConfig.large.row;
    }
    if (positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  gridStyleChild(controlKey: string, controlIn: any): object {
    const control = controlIn.controls[controlKey];
    const gridConfig = control['element']['gridConfig'];
    const positionConfig = control['element']['positionConfig'];
    const mediaSize = this._fgs.getMediaSize();
    let gridStyle = {
      'padding-left': '5px',
      'padding-right': '5px',
    }
    if (control['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(control['element']['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if (gridConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-template-columns'] = gridConfig.large.column;
      gridStyle['grid-template-rows'] = gridConfig.large.row;
    }
    if (positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  gridStyleDecorator(decorator) {
    const positionConfig = decorator['positionConfig'];
    const mediaSize = this._fgs.getMediaSize();
    let gridStyle = {
      'padding-left': '5px',
      'padding-right': '5px',
    };
    if (decorator['borderConfig'] != null) {
      const borderConfig = this.getBorder(decorator['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if (positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  getBorder(borderConfig: string) {
    const borderConfig_ = {
      'border-radius': '.2rem',
    };
    const border = '1px solid #797D81';
    switch (borderConfig) {
      case BorderType.ltrb:
        borderConfig_['border-left'] = border;
        borderConfig_['border-top'] = border;
        borderConfig_['border-right'] = border;
        borderConfig_['border-bottom'] = border; break;
      case BorderType.lrb:
        borderConfig_['border-left'] = border;
        borderConfig_['border-right'] = border;
        borderConfig_['border-bottom'] = border; break;
      case BorderType.trb:
        borderConfig_['border-top'] = border;
        borderConfig_['border-right'] = border;
        borderConfig_['border-bottom'] = border; break;
      case BorderType.rb:
        borderConfig_['border-right'] = border;
        borderConfig_['border-bottom'] = border; break;
      case BorderType.ltrb:
        borderConfig_['border-left'] = border;
        borderConfig_['border-top'] = border;
        borderConfig_['border-right'] = border;
        borderConfig_['border-bottom'] = border; break;
      case BorderType.lr:
        borderConfig_['border-left'] = border;
        borderConfig_['border-right'] = border; break;
      case BorderType.r:
        borderConfig_['border-right'] = border; break;
      case BorderType.ltr:
        borderConfig_['border-left'] = border;
        borderConfig_['border-top'] = border;
        borderConfig_['border-right'] = border; break;
      case BorderType.tr:
        borderConfig_['border-top'] = border;
        borderConfig_['border-right'] = border; break;
      default: break;
    }
    return borderConfig_;
  }
}
