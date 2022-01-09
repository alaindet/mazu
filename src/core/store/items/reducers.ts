import { PayloadAction } from '@reduxjs/toolkit';

import { MazuItem } from 'src/common/types';
import { ItemsState } from './state';

export const create = (state: ItemsState, action: PayloadAction<{
  id: string;
  listId: string;
  name: string;
  amount: number;
  description: string;
}>) => {
  state.byId[action.payload.id] = { ...action.payload, isDone: false };
  state.allIds = [...state.allIds, action.payload.id].sort();
};

export const update = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], ...action.payload };
};

export const markAsDone = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isDone: true };
};

export const unmarkAsDone = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isDone: false };
};

export const remove = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  delete state.byId[id];
  state.allIds = state.allIds.filter(anId => anId !== id);
};
