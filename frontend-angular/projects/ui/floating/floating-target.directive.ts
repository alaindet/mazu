import { Directive, Input, ElementRef, Renderer2, HostListener, Output, EventEmitter, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { computePosition, offset, flip } from '@floating-ui/dom';

import { InputBoolean } from '@/common';
import { MazuFloatingTargetInput } from './floating-target.input';
import { MazuFloatingTriggerDirective } from './floating-trigger.directive';

@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
})
export class MazuFloatingTargetDirective {

  // TODO: Remove input interface?
  @Input('mzFloatingTarget') triggerRef!: MazuFloatingTargetInput['triggerRef'];
  @Input() offset: MazuFloatingTargetInput['offset'] = 5; // 5px
  @Input() clickStrategy: MazuFloatingTargetInput['clickStrategy'] = 'close';
  @Input() scrollStrategy: MazuFloatingTargetInput['scrollStrategy'] = 'none'; // TODO
  @Input() @InputBoolean() closeOnClickAway: MazuFloatingTargetInput['closeOnClickAway'] = true;
  @Input() cssClassBase?: MazuFloatingTargetInput['cssClassBase'];
  @Input() cssClassClose?: MazuFloatingTargetInput['cssClassClose'];
  @Input() cssClassOpen?: MazuFloatingTargetInput['cssClassOpen'];

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  private backdropElementId = 'mazu-floating-backdrop';

  constructor(
    private host: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private readonly documentRef: Document,
  ) {}

  ngOnInit(): void {
    this.setBaseStyle();
    this.isOpen ? this.setOpenStyle() : this.setCloseStyle();
  }

  @HostListener('click')
  onClick(): void {
    if (this.clickStrategy === 'close') {
      this.close();
    }
  }

  // Public API
  toggle(): void {
    this.isOpen ? this.close() : this.open();
  }

  // Public API
  open(): void {
    this.isOpen = true;
    this.setOpenStyle();
    this.updatePosition();
    if (this.closeOnClickAway) {
      this.addBackdropElement();
    }
    this.opened.emit();
  }

  // Public API
  close(): void {
    this.isOpen = false;
    this.setCloseStyle();
    if (this.closeOnClickAway) {
      this.removeBackdropElement();
    }
    this.closed.emit();
  }

  private async updatePosition(): Promise<void> {
    const target = this.host.nativeElement;
    const trigger = this.triggerRef.host.nativeElement;

    const { x, y } = await computePosition(trigger, target, {
      placement: 'top-start',
      middleware: [
        offset(this.offset),
        flip(),
      ],
    });

    this.setPositionStyle(x, y);
  }

  private setBaseStyle(): void {
    const target = this.host.nativeElement;

    if (this.cssClassBase) {
      this.renderer.addClass(target, this.cssClassBase);
    } else {
      this.renderer.setStyle(target, 'position', 'fixed');
      this.renderer.setStyle(target, 'display', 'none');
    }
  }

  private setOpenStyle(): void {
    if (!this.cssClassOpen) {
      this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
      return;
    }

    if (this.cssClassClose) {
      this.renderer.removeClass(this.host.nativeElement, this.cssClassClose);
    }

    this.renderer.addClass(this.host.nativeElement, this.cssClassOpen);
  }

  private setCloseStyle(): void {
    if (!this.cssClassClose) {
      this.renderer.setStyle(this.host.nativeElement, 'display', 'none');
      return;
    }

    if (this.cssClassOpen) {
      this.renderer.removeClass(this.host.nativeElement, this.cssClassOpen);
    }

    this.renderer.addClass(this.host.nativeElement, this.cssClassClose);
  }

  private setPositionStyle(x: number, y: number): void {
    this.renderer.setStyle(this.host.nativeElement, 'left', `${x}px`);
    this.renderer.setStyle(this.host.nativeElement, 'top', `${y}px`);
  }

  /**
	 * The backdrop element is a runtime temporary element to help catch clicks
	 * outside of the floating target, in order to close the target on click away
	 */
  private addBackdropElement(): void {
    this.renderer.setStyle(this.host.nativeElement, 'z-index', '2');
		const backdropElement = this.documentRef.createElement('div');
    backdropElement.id = this.backdropElementId;
		backdropElement.textContent = '';
		backdropElement.style.position = 'fixed';
		backdropElement.style.zIndex = '1';
		backdropElement.style.top = '0';
		backdropElement.style.right = '0';
		backdropElement.style.bottom = '0';
		backdropElement.style.left = '0';
    this.documentRef.body.appendChild(backdropElement);
		backdropElement.addEventListener('click', this.close.bind(this));
  }

  private removeBackdropElement(): void {
    const cssQuery = `#${this.backdropElementId}`;
		const backdropElement = this.documentRef.querySelector(cssQuery);
		backdropElement?.parentNode?.removeChild(backdropElement);
		this.renderer.setStyle(this.host.nativeElement, 'z-index', 'initial');
  }
}
