import { MazuList } from 'src/common/types';

export interface ListsState {
  byId: {
    [listId: string]: MazuList;
  };
  allIds: string[];
}

export const initialState: ListsState = {
  byId: {},
  allIds: [],
};
