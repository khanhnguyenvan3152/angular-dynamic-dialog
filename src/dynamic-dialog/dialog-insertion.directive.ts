import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appInsertion]',
})
export class DialogInsertionDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
