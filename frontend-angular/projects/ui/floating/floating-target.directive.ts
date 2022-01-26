import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ComputePositionReturn, ComputePositionConfig } from '@floating-ui/core';
import { computePosition, flip } from '@floating-ui/dom';

import { CssRules } from '@/common';
import { MazuFloatingReferenceDirective } from './floating-reference.directive';

@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
})
export class MazuFloatingTargetDirective implements OnInit {

  @Input('refersTo') floatingReference!: MazuFloatingReferenceDirective;
  @Input() clickStrategy: 'close' | 'none' = 'none';
  @Input() isOpen?: boolean;

  @HostBinding('style')
  cssStyle?: CssRules;

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
    this.computePosition();
  }

  // Public API
  close(): void {
    this.isOpen = false;
  }

  // Public API
  toggle(): void {
    if (!!this.isOpen) {
      this.close();
      return;
    }

    this.open();
  }

  private computeCssStyle(): CssRules | undefined {
    return {
      position: 'fixed',
    };
  }

  private async computePosition(): Promise<void> {
    const ref = this.floatingReference.host.nativeElement;
    const target = this.host.nativeElement;

    const middleware = [
      flip(),
    ];

    const options: Partial<ComputePositionConfig> = {
      placement: 'bottom',
      middleware,
    };

    const pos: ComputePositionReturn = await computePosition(ref, target, options);

    const cssStyle: CssRules = {};
    cssStyle['top'] = `${pos.x}px`;
    cssStyle['left'] = `${pos.y}px`;
    if (!this.cssStyle) this.cssStyle = {};
    this.cssStyle = { ...this.cssStyle, ...cssStyle };
  }
}
