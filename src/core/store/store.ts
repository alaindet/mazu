import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import listsReducer from 'src/features/lists/store';
import itemsReducer from 'src/features/items/store';

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
