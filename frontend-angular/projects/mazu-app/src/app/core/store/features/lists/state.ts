import { List } from '../../../types';

export interface ListsState {
  lists: List[];
  isLoading: boolean;
}

export const listsInitialState: ListsState = {
  lists: [],
  isLoading: false,
};
