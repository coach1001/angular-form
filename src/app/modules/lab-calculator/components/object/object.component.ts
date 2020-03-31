import { Component } from '@angular/core';
import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';
import { BorderType } from 'projects/ng-dui/src/lib/dui-form/services/dui-border.enum';

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
    const spanConfig = gridConfig?.spanConfig;
    const trackConfig = gridConfig?.trackConfig;
    const mediaSize = this._fgs_.getMediaSize();
    let gridStyle = {
      'display': 'grid'
    }

    if (this.controlIn['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(this.controlIn['element']['borderConfig']);
      gridStyle = {...gridStyle, ...borderConfig};
    }

    if (spanConfig) {
    }
    if (trackConfig && trackConfig[mediaSize]) {
      if (trackConfig[mediaSize].columns && trackConfig[mediaSize].columns !== '') {
        gridStyle['grid-template-columns'] = trackConfig[mediaSize].columns;
      }
      if (trackConfig[mediaSize].rows && trackConfig[mediaSize].rows !== '') {
        gridStyle['grid-template-rows'] = trackConfig[mediaSize].rows;
      }
    }
    return gridStyle;
  }

  gridStyleChild(controlKey: string): object {
    const control = this.controlIn.controls[controlKey];
    const gridConfig = control['element']['gridConfig'];
    const spanConfig = gridConfig?.spanConfig;
    const trackConfig = gridConfig?.trackConfig;
    const mediaSize = this._fgs_.getMediaSize();
    let gridStyle = {
      padding: '7px'
    };
    if (control['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(control['element']['borderConfig']);
      gridStyle = {...gridStyle, ...borderConfig};
    }    
    if (spanConfig && spanConfig[mediaSize]) {
      if (spanConfig[mediaSize].columns && spanConfig[mediaSize].columns !== '') {
        gridStyle['grid-column'] = `span ${spanConfig[mediaSize].columns}`;
      }
      if (spanConfig[mediaSize].rows && spanConfig[mediaSize].rows !== '') {
        gridStyle['grid-row'] = `span ${spanConfig[mediaSize].rows}`;
      }
    }
    if (trackConfig && trackConfig[mediaSize]) {
    }
    return gridStyle;
  }

  getBorder(borderConfig: string) {    
    const borderConfig_ = {};
    switch (borderConfig) {
      case BorderType.ltrb:
        borderConfig_['border-left'] = '1px solid #dee2e6';
        borderConfig_['border-top'] = '1px solid #dee2e6';
        borderConfig_['border-right'] = '1px solid #dee2e6';
        borderConfig_['border-bottom'] = '1px solid #dee2e6'; break;
      case BorderType.lrb:
        borderConfig_['border-left'] = '1px solid #dee2e6';        
        borderConfig_['border-right'] = '1px solid #dee2e6';
        borderConfig_['border-bottom'] = '1px solid #dee2e6'; break;
      case BorderType.trb:        
        borderConfig_['border-top'] = '1px solid #dee2e6';
        borderConfig_['border-right'] = '1px solid #dee2e6';
        borderConfig_['border-bottom'] = '1px solid #dee2e6'; break;
      case BorderType.rb:
        borderConfig_['border-right'] = '1px solid #dee2e6';
        borderConfig_['border-bottom'] = '1px solid #dee2e6'; break;
      default: break;
    }
    return borderConfig_;
  }
}
