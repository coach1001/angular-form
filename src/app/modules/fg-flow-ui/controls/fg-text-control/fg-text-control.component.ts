import { Component, Input, Injector } from '@angular/core';
import { FgBaseElementComponent } from '../../components/fg-base-element/fg-base-element.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fg-text-control',
  templateUrl: './fg-text-control.component.html',
  styleUrls: ['./fg-text-control.component.scss']
})
export class FgTextControlComponent extends FgBaseElementComponent {

  @Input()
  controlIn: FormControl;

  constructor() {
    super();
  }

}
