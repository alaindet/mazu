import { StoreDevtoolsOptions } from '@ngrx/store-devtools';

import user, { UserEffects } from './features/user';
import lists, { ListsEffects } from './features/lists';
import items, { ItemsEffects } from './features/items';
import ui from './features/items';

export const reducers = {
  items,
  lists,
  user,
  ui,
};

export const effects = [
  ItemsEffects,
  ListsEffects,
  UserEffects,
];

export const devToolsConfig: StoreDevtoolsOptions = {
  maxAge: 25,
};
