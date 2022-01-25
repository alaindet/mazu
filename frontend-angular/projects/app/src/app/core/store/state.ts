import { ItemsState } from './features/items';
import { ListsState } from './features/lists';
import { UserState } from './features/user';

export interface AppState {
  items: ItemsState;
  lists: ListsState;
  user: UserState;
}
