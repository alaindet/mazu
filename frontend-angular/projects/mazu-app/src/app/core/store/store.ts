import { StoreDevtoolsOptions } from '@ngrx/store-devtools';

import user, { UserEffects } from './features/user';

export const reducers = {
  user,
};

export const effects = [
  UserEffects,
];

export const devToolsConfig: StoreDevtoolsOptions = {
  maxAge: 25,
};
