import { Component, ViewChild, ComponentFactoryResolver, Input, AfterViewInit } from '@angular/core';
import { DynamicAnchorDirective } from '../../directives/dynamic-anchor.directive';
import { DuiComponentsRegistryService } from '../../services/dui-components-registry.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { DuiFormGeneratorService } from '../../../dui-form/services/dui-form-generator.service';

@Component({
  selector: 'dui-dynamic',
  templateUrl: './dui-dynamic.component.html',
  styleUrls: ['./dui-dynamic.component.scss']
})
export class DuiDynamicComponent implements AfterViewInit {

  @Input()
  controlIn: FormGroup | FormArray | FormControl;

  @Input()
  parent: FormGroup | FormArray | FormControl;

  @Input()
  inputs: any;

  @Input()
  template: string;

  @ViewChild(DynamicAnchorDirective) duiDynamicAnchor: DynamicAnchorDirective;

  componentFactory: any;
  componentRef: any;

  constructor(
    private _fgs: DuiFormGeneratorService,
    private _cfr: ComponentFactoryResolver,
    private _duicr: DuiComponentsRegistryService
  ) { }

  ngAfterViewInit(): void {
    Promise.resolve(null).then(() => this.renderChildren());
  }

  renderChildren() {
    let component;
    if (this.inputs != null) {
      component = this._duicr.getComponent(this.inputs['controlIn']['element']?.uiTemplate);
    } else if (this.controlIn != null) {
      component = this._duicr.getComponent(this.controlIn['element'].uiTemplate);
    }
    if (component != null) {
      this.componentFactory = this._cfr.resolveComponentFactory(component);
      this.duiDynamicAnchor.viewContainerRef.clear();
      this.componentRef = this.duiDynamicAnchor.viewContainerRef.createComponent(this.componentFactory);
      if (this.inputs != null) {
        for (var key in this.inputs) {
          if (this.inputs.hasOwnProperty(key)) {
            this.componentRef.instance[key] = this.inputs[key];
          }
        }
      } else if (this.controlIn != null) {
        this.componentRef.instance['controlIn'] = this.controlIn;
        this.componentRef.instance['parent'] = this.controlIn;
      }
    }
  }
}
