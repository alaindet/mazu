import { MazuItem } from 'src/common/types';

export interface ItemsState {
  byId: {
    [listId: string]: MazuItem;
  };
  allIds: string[];
}

export const initialState: ItemsState = {
  byId: {},
  allIds: [],
};
