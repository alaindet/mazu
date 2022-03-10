import { Inject, Injectable, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { animationFrameScheduler, BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { take, throttleTime } from 'rxjs/operators';

import { getPositionFunction, getScrollParent, isElementVisible } from '../functions';
import { MazuFloatingPair, MazuFloatingTargetPositionConfig, MazuFloatingTargetPosition, MazuFloatingPairConfig, MazuFloatingTargetData } from '../types/types';

@Injectable()
export class MazuFloatingService implements OnDestroy {

  private subs: { [sub: string]: Subscription } = {};

  pairs: { [name: string]: MazuFloatingPair } = {};
  positionFunctions: { [name: string]: () => Promise<MazuFloatingTargetPosition> } = {};

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnDestroy(): void {
    Object.values(this.subs).forEach(sub => sub.unsubscribe());
  }

  async initPositionFunction(
    name: string,
    config: MazuFloatingTargetPositionConfig,
  ): Promise<void> {
    const positionFn = await getPositionFunction(config);
    this.positionFunctions[name] = (): Promise<MazuFloatingTargetPosition> => {
      const trigger = this.pairs[name].config.triggerElement as HTMLElement;
      const target = this.pairs[name].config.targetElement as HTMLElement;
      return positionFn(trigger, target);
    };
  }

  getFloatingPair(name: string): MazuFloatingPair {
    return this.pairs[name];
  }

  setTrigger(name: string, config: Partial<MazuFloatingPairConfig>): void {
    this.createPairIfNeeded(name);
    this.pairs[name].config = { ...this.pairs[name].config, ...config };
  }

  setTarget(name: string, config: Partial<MazuFloatingPairConfig>): void {
    this.createPairIfNeeded(name);
    const { triggerElement, targetElement, ...positionConfig } = config;
    this.initPositionFunction(name, positionConfig as MazuFloatingTargetPositionConfig);
    this.pairs[name].config = { ...this.pairs[name].config, ...config };
  }

  async openTarget(name: string): Promise<void> {
    this.updatePosition(name);
    this.addExternalListeners(name);
  }

  closeTarget(name: string): void {
    this.pairs[name].data.next({ isOpen: false, x: 0, y: 0 });
    this.removeExternalListeners(name);
  }

  toggleTarget(name: string): void {
    const pair = this.pairs[name];
    const data = pair.data.getValue() as MazuFloatingTargetData;
    data?.isOpen ? this.closeTarget(name) : this.openTarget(name);
  }

  private addExternalListeners(name: string): void {
    this.removeExternalListeners(name);
    const trigger = this.pairs[name].config.triggerElement as HTMLElement;
    const target = this.pairs[name].config.targetElement as HTMLElement;
    const scrollParent = getScrollParent(trigger);

    // Make target follow trigger on page scroll
    this.subs[`scroll_${name}`] = fromEvent(scrollParent, 'scroll')
      .pipe(throttleTime(0, animationFrameScheduler))
      .subscribe(() => {
        if (!isElementVisible(trigger)) {
          this.closeTarget(name);
          return;
        }
        this.updatePosition(name)
      });

    // Close target on page resize
    this.subs[`resize_${name}`] = fromEvent(window, 'resize')
      .pipe(take(1))
      .subscribe(() => this.closeTarget(name));

    // Close target on outside click
    if (this.pairs[name].config.closeOnClick) {
      this.subs[`outside_click_${name}`] = fromEvent(this.document, 'click')
        .subscribe(event => {
          const clickTarget = event.target as HTMLElement;

          if (
            clickTarget === trigger ||
            trigger.contains(clickTarget) ||
            clickTarget === target ||
            target.contains(clickTarget)
          ) {
            return;
          }

          this.closeTarget(name);
        });
    }
  }

  private removeExternalListeners(name: string): void {
    this.subs[`scroll_${name}`]?.unsubscribe();
    this.subs[`resize_${name}`]?.unsubscribe();
    this.subs[`outside_click_${name}`]?.unsubscribe();
  }

  private async updatePosition(name: string): Promise<void> {
    const { x, y } = await this.positionFunctions[name]();
    this.pairs[name].data.next({ isOpen: true, x, y });
  }

  private createPairIfNeeded(name: string): void {
    if (!this.pairs[name]) {
      this.pairs[name] = {
        config: {
          triggerElement: null,
          targetElement: null,
          offsetX: 0,
          offsetY: 0,
        },
        data: new BehaviorSubject<MazuFloatingTargetData | null>(null),
        targetTemplate: null,
      };
    }
  }
}
