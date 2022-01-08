import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import * as fromReducers from './reducers';

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    create: fromReducers.create,
    update: fromReducers.update,
    markAsFavorite: fromReducers.markAsFavorite,
    unmarkAsFavorite: fromReducers.unmarkAsFavorite,
    remove: fromReducers.remove,
  },
});

// Actions
export const {
  create,
  update,
  markAsFavorite,
  unmarkAsFavorite,
  remove,
} = listsSlice.actions;

// Reducer
export default listsSlice.reducer;
