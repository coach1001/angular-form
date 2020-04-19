import { Component, OnInit } from '@angular/core';
import { DuiBaseObjectComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-object/dui-base-object.component';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends DuiBaseObjectComponent implements OnInit {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }
  
}
