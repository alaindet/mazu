import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ItemsState } from './state';
import { itemsFeature } from './feature';

export const selectItemsFeature = createFeatureSelector<ItemsState>(itemsFeature);

export const selectItems = createSelector(
  selectItemsFeature,
  feat => feat.items,
);

export const selectItemsAreLoading = createSelector(
  selectItemsFeature,
  feat => feat.isLoading,
);
