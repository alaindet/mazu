import { Directive, Input, ElementRef, Renderer2, HostListener, Output, EventEmitter } from '@angular/core';
import { computePosition, offset, flip } from '@floating-ui/dom';

import { InputBoolean } from '@/common';
import { MazuFloatingTriggerDirective } from './floating-trigger.directive';
import { DocumentClickService } from './document-click.service';

@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
  providers: [DocumentClickService],
})
export class MazuFloatingTargetDirective {

  @Input('mzFloatingTarget') triggerRef!: MazuFloatingTriggerDirective;
  @Input() offset: number = 5; // 5px
  @Input() clickStrategy: 'close' | 'none' = 'close';
  @Input() scrollStrategy: 'close' | 'none' = 'none'; // TODO
  @Input() @InputBoolean() closeOnClickAway: boolean | string = true;
  @Input() cssClassBase?: string;
  @Input() cssClassClose?: string;
  @Input() cssClassOpen?: string;

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  isOpen = false;

  constructor(
    private host: ElementRef,
    private renderer: Renderer2,
    private documentClick: DocumentClickService,
  ) {}

  ngOnInit(): void {
    this.setBaseStyle();
    this.initCloseOnClickAway();
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
    this.opened.emit();
  }

  // Public API
  close(): void {
    this.isOpen = false;
    this.setCloseStyle();
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

  // TODO: Inject conditionally (https://stackoverflow.com/questions/37482460/)
  private initCloseOnClickAway(): void {
    if (this.closeOnClickAway) {
      this.documentClick.getOutsideClick(this.host.nativeElement)
        .subscribe(event => {

          // TODO
          console.log('click target', event);
          console.log('clicked outside', this.host.nativeElement.contains(event.target));

          this.close();
        });
    }
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
}
