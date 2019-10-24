import { Component, OnInit, Input, Injector } from '@angular/core';
import { FgBaseElementComponent } from '../../components/fg-base-element/fg-base-element.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-fg-hidden-text-control',
  templateUrl: './fg-hidden-text-control.component.html',
  styleUrls: ['./fg-hidden-text-control.component.scss']
})
export class FgHiddenTextControlComponent extends FgBaseElementComponent {

  @Input()
  controlIn: FormControl;

  hidden = true;

  constructor() {
    super();
  }

}
