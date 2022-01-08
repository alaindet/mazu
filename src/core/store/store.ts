import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import listsReducer from 'src/features/lists/store';

// TODO: Split store?
export const store = configureStore({
  reducer: {
    lists: listsReducer,
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
