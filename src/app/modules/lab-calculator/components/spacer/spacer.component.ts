import { Component } from '@angular/core';
// import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiBaseControlComponent } from 'projects/ng-dui/src/lib/dui-components/components/base/dui-base-control/dui-base-control.component';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent extends DuiBaseControlComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }
  
  ngOnInit() {}

}