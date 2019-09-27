import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ElementControlComponent } from '../element-control/element-control.component';
import { ElementArrayComponent } from '../element-array/element-array.component';
import * as changeCase from 'change-case';

@Component({
  selector: 'app-element-group',
  templateUrl: './element-group.component.html',
  styleUrls: ['./element-group.component.scss']
})
export class ElementGroupComponent implements OnInit {
  @Input()
  name: string;
  @Input()
  label: string;
  @Input()
  parent: FormGroup;
  @Input()
  elements: any;

  constructor() { }

  ngOnInit() {
  }

  getElementComponent(type: string): any {
    if (type === 'CONTROL') {
      return ElementControlComponent;
    } else if (type === 'OBJECT') {
      return ElementGroupComponent;
    } else if (type === 'ARRAY') {
      return ElementArrayComponent;
    }
    return null;
  }

  getElementInputs(element: any): any {
    return { ...element, parent: this.parent.controls[this.name] };
  }

  get _label_() {
    return this.label ? this.label : changeCase.sentenceCase(this.name);
  }

}
