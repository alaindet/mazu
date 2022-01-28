import { MazuFloatingTriggerDirective } from './floating-trigger.directive';

export interface MazuFloatingTargetInput {
  triggerRef: MazuFloatingTriggerDirective;
  offset: number; // Number of pixels of offset from trigger element
  clickStrategy: 'close' | 'none';
  scrollStrategy: 'close' | 'none';
  closeOnClickAway: boolean | string;
  cssClassClose?: string;
  cssClassOpen?: string;
  cssClassBase?: string;
}
