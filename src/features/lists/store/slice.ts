import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import * as fromReducers from './reducers';

// Name
const name = 'lists';

// Partial reducers
const reducers = {
  create: fromReducers.create,
  update: fromReducers.update,
  markAsFavorite: fromReducers.markAsFavorite,
  unmarkAsFavorite: fromReducers.unmarkAsFavorite,
  remove: fromReducers.remove,
};

// Slice
export const listsSlice = createSlice({
  name,
  initialState,
  reducers,
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
