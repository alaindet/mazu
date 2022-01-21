import { StoreDevtoolsOptions } from '@ngrx/store-devtools';

import user, { UserEffects } from './features/user';
import lists, { ListsEffects } from './features/lists';

export const reducers = {
  user,
  lists,
};

export const effects = [
  UserEffects,
  ListsEffects,
];

export const devToolsConfig: StoreDevtoolsOptions = {
  maxAge: 25,
};
