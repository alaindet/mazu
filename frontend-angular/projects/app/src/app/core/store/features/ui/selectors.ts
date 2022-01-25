import { createSelector, createFeatureSelector } from '@ngrx/store';

import { UiState } from './state';
import { uiFeature } from './feature';

export const selectUiFeature = createFeatureSelector<UiState>(uiFeature);

export const selectUiTitle = createSelector(
  selectUiFeature,
  ui => ui.title,
);

export const selectUiIsLoading = createSelector(
  selectUiFeature,
  ui => ui.isLoading,
);

export const selectUiLoaderColor = createSelector(
  selectUiFeature,
  ui => ui.loaderColor,
);

export const selectUiAlert = createSelector(
  selectUiFeature,
  ui => ui.alert,
);
