import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { MazuFloatingService } from '../services/floating.service';
import { MazuFloatingTargetPlacement, MazuFloatingTargetData } from '../types';

@Directive({
  selector: '[mzFloatingTarget]',
  exportAs: 'mzFloatingTarget',
})
export class MazuFloatingTargetDirective implements OnInit, OnDestroy {

  @Input('mzFloatingTarget') name!: string;
  @Input() placement?: string = MazuFloatingTargetPlacement.BottomRight;
  @Input() offsetY?: number | string = 0;
  @Input() offsetX?: number | string = 0;

  isOpen = false;

  private destroy$ = new Subject<void>();

  constructor(
    private host: ElementRef,
    private renderer: Renderer2,
    private floatingService: MazuFloatingService,
  ) {}

  ngOnInit(): void {

    this.renderer.setStyle(this.host.nativeElement, 'position', 'fixed');
    this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.host.nativeElement, 'visibility', 'hidden');

    this.floatingService.setTarget(this.name, {
      targetElement: this.host.nativeElement,
      placement: this.placement as MazuFloatingTargetPlacement,
      offsetX: +(this.offsetX ?? 0),
      offsetY: +(this.offsetY ?? 0),
    });

    this.floatingService.getFloatingPair(this.name).data
      .pipe(
        takeUntil(this.destroy$),
        filter(data => data !== null),
        map(data => data as MazuFloatingTargetData),
      )
      .subscribe(data => {

        if (data.isOpen && !this.isOpen) {
          this.open(data);
          return;
        }

        if (!data.isOpen && this.isOpen) {
          this.close();
          return;
        }

        this.updatePosition(data.x, data.y);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  open(data: MazuFloatingTargetData): void {
    this.isOpen = true;
    this.renderer.setStyle(this.host.nativeElement, 'display', 'block');
    this.renderer.setStyle(this.host.nativeElement, 'visibility', 'initial');
    this.updatePosition(data.x, data.y);
  }

  close(): void {
    this.isOpen = false;
    this.renderer.setStyle(this.host.nativeElement, 'visibility', 'hidden');
  }

  updatePosition(x: number | null, y: number | null): void {
    if (x !== null) {
      this.renderer.setStyle(this.host.nativeElement, 'left', `${x}px`);
    }

    if (y !== null) {
      this.renderer.setStyle(this.host.nativeElement, 'top', `${y}px`);
    }
  }
}