import { MazuFloatingTargetPositionConfig, MazuFloatingTargetPlacement, MazuFloatingPlacementFunction, MazuFloatingTargetPosition, MazuFloatingOffsetFunction } from '../types';
import * as fromPlacement from './placement';

export const getPlacementFunction = (
  config: MazuFloatingTargetPositionConfig,
): MazuFloatingPlacementFunction => {
  const placementFunctions: { [key in MazuFloatingTargetPlacement]: MazuFloatingPlacementFunction } = {
    [MazuFloatingTargetPlacement.TopLeft]: fromPlacement.topLeftPlacement,
    [MazuFloatingTargetPlacement.Top]: fromPlacement.topPlacement,
    [MazuFloatingTargetPlacement.TopRight]: fromPlacement.topRightPlacement,
    [MazuFloatingTargetPlacement.Left]: fromPlacement.leftPlacement,
    [MazuFloatingTargetPlacement.Right]: fromPlacement.rightPlacement,
    [MazuFloatingTargetPlacement.BottomLeft]: fromPlacement.bottomLeftPlacement,
    [MazuFloatingTargetPlacement.Bottom]: fromPlacement.bottomPlacement,
    [MazuFloatingTargetPlacement.BottomRight]: fromPlacement.bottomRightPlacement,
  };

  const placement = config?.placement ?? MazuFloatingTargetPlacement.BottomLeft;
  return placementFunctions[placement];
};

export const getOffsetFunction = (
  config: MazuFloatingTargetPositionConfig,
): MazuFloatingOffsetFunction => {
  return (pos: MazuFloatingTargetPosition) => ({
    x: pos.x + (config?.offsetX ?? 0),
    y: pos.y + (config?.offsetY ?? 0),
  });
};
