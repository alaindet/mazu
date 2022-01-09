import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import listsReducer from './lists';
import itemsReducer from './items';

// TODO: Split store?
export const store = configureStore({
  reducer: {
    lists: listsReducer,
    items: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
