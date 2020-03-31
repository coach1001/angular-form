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
      gridStyle = { ...gridStyle, ...borderConfig };
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
      padding: '5px'
    };
    if (control['element']['borderConfig'] != null) {
      const borderConfig = this.getBorder(control['element']['borderConfig']);
      gridStyle = { ...gridStyle, ...borderConfig };
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
