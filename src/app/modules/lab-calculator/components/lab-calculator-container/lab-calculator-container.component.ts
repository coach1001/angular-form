import { Component, OnInit } from '@angular/core';
// import { DuiFormGeneratorService, DuiFlowService, MediaSize } from 'ng-dui';
import { DuiFormGeneratorService } from 'projects/ng-dui/src/lib/dui-form/services/dui-form-generator.service';
import { DuiFlowService } from 'projects/ng-dui/src/lib/dui-flow/services/dui-flow.service';
import { MediaSize } from 'projects/ng-dui/src/lib/dui-form/services/dui-media-size.enum';

@Component({
  selector: 'app-lab-calculator-container',
  templateUrl: './lab-calculator-container.component.html',
  styleUrls: ['./lab-calculator-container.component.scss']
})
export class LabCalculatorContainerComponent implements OnInit {

  currentStep$;

  constructor(
    private _fgs: DuiFormGeneratorService,
    private _fs: DuiFlowService
  ) { }

  ngOnInit() {
    this.currentStep$ = this._fs.currentStep$;
  }

  async back() {
    await this._fs.backStep();
  }

  async next() {
    await this._fs.nextStep();
  }

  get bodyGridStyle(): object {
    const mediaSize = this._fgs.getMediaSize();    
    const bodyWrapper = {
      display: 'grid',
      height: '100%'
    };
    if(mediaSize === MediaSize.Large) {
      bodyWrapper['grid-template-columns'] = '1fr 8fr 1fr';      
    } else if(mediaSize === MediaSize.Medium) {
      bodyWrapper['grid-template-columns'] = '1fr 16fr 1fr' ;      
    } else if(mediaSize === MediaSize.Small) {
      bodyWrapper['grid-template-columns'] = '0px 1fr 0px';      
    }    
    return bodyWrapper;
  }

}
