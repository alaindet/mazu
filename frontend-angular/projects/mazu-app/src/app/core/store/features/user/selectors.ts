import { createFeatureSelector } from '@ngrx/store';

import { UserState } from './state';
import { userFeature } from './feature';

export const selectUserFeature = createFeatureSelector<UserState>(userFeature);

// TODO...
