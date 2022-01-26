import { Directive, HostListener, Input } from '@angular/core';

import { MazuFloatingReferenceDirective } from './floating-reference.directive';
@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
})
export class MazuFloatingTargetDirective {

  @Input('refersTo') floatingReference!: MazuFloatingReferenceDirective;
  @Input() clickStrategy: 'close' | 'none' = 'none';
  @Input() isOpen?: boolean;

  @HostListener('click')
  onClick(): void {
    if (this.clickStrategy === 'close') {
      this.close();
    }
  }

  // Public API
  open(): void {
    this.isOpen = true;
  }

  // Public API
  close(): void {
    this.isOpen = false;
  }

  // Public API
  toggle(): void {
    this.isOpen = !!this.isOpen ? false : true;
  }
}
