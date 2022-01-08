import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/core/store';
import { ListsState } from './state';

const selectListsSlice = (state: RootState) => state.lists;
const selectListId = (state: RootState, listId: string) => listId;

// Usage
// selectListById(state, 'myList1');
// const todo = useSelector(state => selectListById(state, 'myList1'))
export const selectListById = createSelector(
  [selectListsSlice, selectListId],
  (lists: ListsState, listId: string) => lists.byId[listId]
);
