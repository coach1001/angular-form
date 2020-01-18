import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dui-dynamic-anchor]'
})
export class DynamicAnchorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
