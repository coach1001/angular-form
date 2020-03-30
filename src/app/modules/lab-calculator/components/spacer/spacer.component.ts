import { Component } from '@angular/core';
import { DuiBaseObjectComponent, DuiFormGeneratorService } from 'ng-dui';

@Component({
  selector: 'app-spacer',
  templateUrl: './spacer.component.html',
  styleUrls: ['./spacer.component.scss']
})
export class SpacerComponent extends DuiBaseObjectComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }
  
  ngOnInit() {}

}