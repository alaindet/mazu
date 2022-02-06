import { MazuFloatingPositionFunction, MazuFloatingTargetPosition, MazuFloatingTargetPositionConfig } from '../types';
import { getPlacementFunction, getOffsetFunction } from './middleware';
import { waitFor } from './utils';

export const getPositionFunction = async (
  config: MazuFloatingTargetPositionConfig,
): Promise<MazuFloatingPositionFunction> => {

  const placementFn = getPlacementFunction(config);
  const offsetFn = getOffsetFunction(config);

  return async (
    trigger: HTMLElement,
    target: HTMLElement,
  ): Promise<MazuFloatingTargetPosition> => {
    const triggerRect = trigger.getBoundingClientRect();
    const targetRect = await waitFor<DOMRect>(() => target.getBoundingClientRect());
    let pos = placementFn(triggerRect, targetRect);
    const { x, y } = offsetFn(pos);
    return new Promise<MazuFloatingTargetPosition>(resolve => resolve({ x, y }));
  };
};
