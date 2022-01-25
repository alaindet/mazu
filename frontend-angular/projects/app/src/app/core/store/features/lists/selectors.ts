import { createSelector, createFeatureSelector } from '@ngrx/store';

import { ListsState } from './state';
import { listsFeature } from './feature';

export const selectListsFeature = createFeatureSelector<ListsState>(listsFeature);

export const selectLists = createSelector(
  selectListsFeature,
  feat => feat.lists,
);

export const selectListsAreLoading = createSelector(
  selectListsFeature,
  feat => feat.isLoading,
);
