import { Component } from '@angular/core';
import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';

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
  
}
