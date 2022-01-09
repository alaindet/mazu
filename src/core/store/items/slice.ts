import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import * as fromReducers from './reducers';

// Name
const name = 'items';

// Partial reducers
const reducers = {
  create: fromReducers.create,
  update: fromReducers.update,
  markAsDone: fromReducers.markAsDone,
  unmarkAsDone: fromReducers.unmarkAsDone,
  remove: fromReducers.remove,
};

// Slice
export const slice = createSlice({
  name,
  initialState,
  reducers,
});

// Actions
export const {
  create,
  update,
  markAsDone,
  unmarkAsDone,
  remove,
} = slice.actions;

// Reducer
export default slice.reducer;
