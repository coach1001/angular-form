import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appElement]'
})
export class ElementDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
