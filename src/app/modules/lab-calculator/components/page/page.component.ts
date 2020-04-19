import { Component, OnInit } from '@angular/core';
import { DuiBaseObjectComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-object/dui-base-object.component';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent extends DuiBaseObjectComponent implements OnInit {
  
  orientation: string;

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  customInit() {    
    this.orientation = this.controlIn['element'].metadata?.pageOrientation 
      ? this.controlIn['element'].metadata.pageOrientation 
      : 'portrait';    
  }

  get printDateTime() {
    return new Date();
  }
}
