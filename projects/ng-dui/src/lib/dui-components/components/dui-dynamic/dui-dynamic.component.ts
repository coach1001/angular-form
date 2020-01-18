import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { DynamicAnchorDirective } from '../../directives/dynamic-anchor.directive';
import { DuiComponentsRegistryService } from '../../services/dui-components-registry.service';

@Component({
  selector: 'dui-dynamic',
  templateUrl: './dui-dynamic.component.html',
  styleUrls: ['./dui-dynamic.component.scss']
})
export class DuiDynamicComponent implements OnInit {
  
  @Input()
  inputs: any;

  @ViewChild(DynamicAnchorDirective, {static: false}) duiDynamicAnchor: DynamicAnchorDirective;
  componentFactory: any;
  componentRef: any;

  constructor(private _cfr: ComponentFactoryResolver, private _duicr: DuiComponentsRegistryService) { }

  ngOnInit(): void {
    this.componentFactory = this._cfr.resolveComponentFactory(this._duicr.getComponent(''));
    this.duiDynamicAnchor.viewContainerRef.clear();
    this.componentRef = this.duiDynamicAnchor.viewContainerRef.createComponent(this.componentFactory);    
    for (var key in this.inputs) {
      if (this.inputs.hasOwnProperty(key)) {
          this.componentRef.instance[key] = this.inputs[key];              
      }
    }        
  }

}
