import { TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MazuFloatingTargetPosition {
  x: number;
  y: number;
}

export enum MazuFloatingTargetPlacement {
  TopLeft = 'top-left',
  Top = 'top',
  TopRight = 'top-right',
  Left = 'left',
  Right = 'right',
  BottomLeft = 'bottom-left',
  Bottom = 'bottom',
  BottomRight = 'bottom-right',
}

export interface MazuFloatingTargetPositionConfig {
  placement?: MazuFloatingTargetPlacement;
  offsetX?: number;
  offsetY?: number;
  closeOnClick?: boolean;
}

export type MazuFloatingPositionFunction = (
  trigger: HTMLElement,
  target: HTMLElement
) => Promise<MazuFloatingTargetPosition>;

export type MazuFloatingPlacementFunction = (
  trigger: DOMRect,
  target: DOMRect
) => MazuFloatingTargetPosition;

export type MazuFloatingOffsetFunction = (
  position: MazuFloatingTargetPosition,
) => MazuFloatingTargetPosition;

export interface MazuFloatingPairConfig extends MazuFloatingTargetPositionConfig {
  triggerElement: HTMLElement | null;
  targetElement: HTMLElement | null;
}

export interface MazuFloatingTargetData extends MazuFloatingTargetPosition {
  isOpen: boolean;
}

export interface MazuFloatingPair {
  config: MazuFloatingPairConfig;
  data: BehaviorSubject<MazuFloatingTargetData | null>;
  targetTemplate: TemplateRef<void> | null;
}
