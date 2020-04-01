import { Component } from '@angular/core';
// import { DuiBaseObjectComponent, DuiFormGeneratorService, BorderType } from 'ng-dui';
import { DuiBaseObjectComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-object/dui-base-object.component';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { BorderType } from 'projects/ng-dui/src/lib/dui-form/services/dui-border.enum';
import { MediaSize } from 'projects/ng-dui/src/public-api';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.scss']
})
export class ObjectComponent extends DuiBaseObjectComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  get gridStyleParent(): object {
    const gridConfig = this.controlIn['element']['gridConfig'];
    const positionConfig = this.controlIn['element']['positionConfig'];    
    const mediaSize = this._fgs_.getMediaSize();
    let gridStyle = {
      'display': 'grid',      
    }
    if (this.controlIn['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(this.controlIn['element']['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if(gridConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-template-columns'] = gridConfig.large.column;
      gridStyle['grid-template-rows'] = gridConfig.large.row;
    }
    if(positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  gridStyleChild(controlKey: string): object {
    const control = this.controlIn.controls[controlKey];
    const gridConfig = control['element']['gridConfig'];
    const positionConfig = control['element']['positionConfig'];    
    const mediaSize = this._fgs_.getMediaSize();
    let gridStyle = {
      padding: '5px',      
    }
    if (control['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(control['element']['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if(gridConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-template-columns'] = gridConfig.large.column;
      gridStyle['grid-template-rows'] = gridConfig.large.row;
    }
    if(positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  gridStyleDecorator(decorator) {    
    const positionConfig = decorator['positionConfig'];    
    const mediaSize = this._fgs_.getMediaSize();
    let gridStyle = {
      padding: '5px'      
    };
    if (decorator['borderConfig'] != null) {
      const borderConfig = this.getBorder(decorator['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
    }
    if(positionConfig != null) {
      // TODO: Look at all sizes
      gridStyle['grid-column'] = positionConfig.large.column;
      gridStyle['grid-row'] = positionConfig.large.row;
    }
    return gridStyle;
  }

  getBorder(borderConfig: string) {
    const borderConfig_ = {};
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
