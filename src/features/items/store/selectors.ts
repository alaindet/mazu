import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/core/store';
import { ItemsState } from './state';

const selectItemsSlice = (state: RootState) => state.items;
const selectListId = (state: RootState, listId: string) => listId;

// Usage
// selectListById(state, 'myList1');
// const todo = useSelector(state => selectListById(state, 'myList1'))
export const selectItemsByListId = createSelector(
  [selectItemsSlice, selectListId],
  (items: ItemsState, listId: string) => {
    return Object.values(items.byId).filter(item => item.listId === listId);
  },
);
