import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ComputePositionReturn, ComputePositionConfig } from '@floating-ui/core';
import { computePosition, flip } from '@floating-ui/dom';

import { CssRules, millisecondsToCss } from '@/common';
import { MazuFloatingReferenceDirective } from './floating-reference.directive';

@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
})
export class MazuFloatingTargetDirective implements OnInit {

  @Input('refersTo') floatingReference!: MazuFloatingReferenceDirective;
  @Input() isOpen?: boolean;
  @Input() clickStrategy: 'close' | 'none' = 'none';
  @Input() animationDuration = 150;

  @HostBinding('style')
  cssStyle: CssRules = {};

  constructor(
    public host: ElementRef,
  ) {}

  @HostListener('click')
  onClick(): void {
    if (this.clickStrategy === 'close') {
      this.close();
    }
  }

  ngOnInit(): void {
    this.cssStyle = this.computeCssStyle();
  }

  // Public API
  open(): void {
    this.isOpen = true;
    setTimeout(() => {
      this.computePosition();
      this.cssStyle['opacity'] = '1';
    });
  }

  // Public API
  close(): void {
    this.cssStyle['opacity'] = '0';
    this.isOpen = false;
  }

  // Public API
  toggle(): void {
    !!this.isOpen
      ? this.close()
      : this.open();
  }

  private computeCssStyle(): CssRules {

    const duration = millisecondsToCss(this.animationDuration);

    return {
      position: 'fixed',
      opacity: this.isOpen ? '0' : '1',
      transition: `${duration} all ease-in-out`,
    };
  }

  private async computePosition(): Promise<void> {
    const ref = this.floatingReference.host.nativeElement;
    const target = this.host.nativeElement;

    const options: Partial<ComputePositionConfig> = {
      placement: 'bottom-start',
      middleware: [
        flip(),
      ],
    };

    const pos: ComputePositionReturn = await computePosition(ref, target, options);

    Object.assign(target.style, {
      left: `${pos.x}px`,
      top: `${pos.y}px`,
    });
  }
}
