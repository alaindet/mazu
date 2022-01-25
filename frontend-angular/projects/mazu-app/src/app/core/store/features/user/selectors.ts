import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UserState } from './state';
import { userFeature } from './feature';

export const selectUserFeature = createFeatureSelector<UserState>(userFeature);

export const selectJwt = createSelector(
  selectUserFeature,
  user => user.jwt,
);

export const selectUserIsLoading = createSelector(
  selectUserFeature,
  user => user.isLoading,
);
