import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'src/core/store';
import { ItemsState } from './state';

export const selectItemsSlice = (state: RootState) => state.items;
// TODO
// const selectListId = (state: RootState, listId: string) => listId;

// // Usage
// // selectListById(state, 'myList1');
// // const todo = useSelector(state => selectListById(state, 'myList1'))
// export const selectListById = createSelector(
//   [selectListsSlice, selectListId],
//   (lists: ListsState, listId: string) => lists.byId[listId],
// );
