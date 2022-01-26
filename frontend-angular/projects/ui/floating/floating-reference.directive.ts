import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mzFloatingReference]',
  exportAs: 'mzFloatingReference',
})
export class MazuFloatingReferenceDirective {
  constructor(
    public host: ElementRef,
  ) {}
}
