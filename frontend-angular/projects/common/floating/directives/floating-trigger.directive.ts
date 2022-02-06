import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MazuFloatingService } from '../services';

@Directive({
  selector: '[mzFloatingTrigger]',
  exportAs: 'mzFloatingTrigger',
})
export class MazuFloatingTriggerDirective implements OnInit, OnDestroy {

  @Input('mzFloatingTrigger') name!: string;
  @Input() triggerOn: 'click' | 'hover' = 'click';

  private destroy$ = new Subject<void>();

  constructor(
    private host: ElementRef,
    private floatingService: MazuFloatingService,
  ) {}

  ngOnInit(): void {
    this.floatingService.setTrigger(this.name, {
      triggerElement: this.host.nativeElement,
    });

    switch (this.triggerOn) {
      case 'click':
        this.handleClickTrigger();
        break;
      case 'hover':
        this.handleHoverTrigger();
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Public API
  open(): void {
    this.floatingService.openTarget(this.name);
  }

  // Public API
  close(): void {
    this.floatingService.closeTarget(this.name);
  }

  // Public API
  toggle(): void {
    this.floatingService.toggleTarget(this.name);
  }

  private handleClickTrigger(): void {
    fromEvent(this.host.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.floatingService.toggleTarget(this.name));
  }

  private handleHoverTrigger(): void {
    fromEvent(this.host.nativeElement, 'mouseenter')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.floatingService.openTarget(this.name));

    fromEvent(this.host.nativeElement, 'mouseleave')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.floatingService.closeTarget(this.name));
  }
}
