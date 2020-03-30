import { Component } from '@angular/core';
import { DuiBaseObjectComponent } from 'ng-dui';
import { DuiFormGeneratorService } from 'ng-dui';

@Component({
  selector: 'app-label-decorator',
  templateUrl: './label-decorator.component.html',
  styleUrls: ['./label-decorator.component.scss']
})
export class LabelDecoratorComponent extends DuiBaseObjectComponent {

  constructor(
    private _fgs_: DuiFormGeneratorService) {
    super(_fgs_);
  }

  ngOnInit() { }

  get labelTextStyle() {    
    return {      
      'font-weight': 'bold',
      'text-align': this.controlIn['element'].metadata?.textAlign ?
        this.controlIn['element'].metadata?.textAlign : 'center'
    }
  }
}
