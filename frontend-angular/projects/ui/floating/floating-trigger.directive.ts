import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mzFloatingTrigger]',
  exportAs: 'mzFloatingTrigger',
})
export class MazuFloatingTriggerDirective {
  constructor(
    public host: ElementRef,
  ) {}
}
