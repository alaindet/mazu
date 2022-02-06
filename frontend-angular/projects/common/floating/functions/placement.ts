import { MazuFloatingTargetPosition as Position } from '../types';

export const topLeftPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.top - target.height;
  const x = (trigger.width > target.width)
    ? trigger.left
    : (trigger.left - target.width + trigger.width);

  return { x, y };
};

export const topPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.top - target.height;
  const x = trigger.left + (trigger.width / 2) - (target.width / 2);

  return { x, y };
};

export const topRightPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.top - target.height;
  const x = (trigger.width > target.width)
    ? (trigger.right - target.width)
    : trigger.left;

  return { x, y };
};

export const leftPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.top + (trigger.height / 2) - (target.height / 2);
  const x = trigger.left - target.width;

  return { x, y };
};

export const rightPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.top + (trigger.height / 2) - (target.height / 2);
  const x = trigger.right;

  return { x, y };
};

export const bottomLeftPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.bottom;
  const x = (trigger.width > target.width)
    ? trigger.left
    : (trigger.left - target.width + trigger.width);

    return { x, y };
};

export const bottomPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.bottom;
  const x = trigger.left - (target.width - trigger.width) / 2;

  return { x, y };
};

export const bottomRightPlacement = (trigger: DOMRect, target: DOMRect): Position => {
  const y = trigger.bottom;
  const x = (trigger.width > target.width)
    ? (trigger.right - target.width)
    : trigger.left;

  return { x, y };
};
