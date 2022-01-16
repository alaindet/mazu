import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './state';
import * as fromReducers from './reducers';
import * as fromItemsActions from '../items';

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
export const slice = createSlice({
  name,
  initialState,
  reducers,
  extraReducers: (builder) => {
    builder.addCase(fromItemsActions.create, (state, action) => {
      const { listId, id } = action.payload;
      state.byId[listId].items.push(id);
    });
    builder.addCase(fromItemsActions.remove, (state, action) => {
      const { listId, id } = action.payload;
      state.byId[listId].items = state.byId[listId].items.filter(anId => anId !== id);
    });
  }
});

// Actions
export const {
  create,
  update,
  markAsFavorite,
  unmarkAsFavorite,
  remove,
} = slice.actions;

// Reducer
export default slice.reducer;
