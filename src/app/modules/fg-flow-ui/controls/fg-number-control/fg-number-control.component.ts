import { Component } from '@angular/core';
import { FgBaseElementComponent } from '../../components/fg-base-element/fg-base-element.component';

@Component({
  selector: 'app-fg-number-control',
  templateUrl: './fg-number-control.component.html',
  styleUrls: ['./fg-number-control.component.scss']
})
export class FgNumberControlComponent extends FgBaseElementComponent {

  constructor() { 
    super();
  }

}
