import { PayloadAction } from '@reduxjs/toolkit';

import { MazuItem } from 'src/common/types';
import { ItemsState } from './state';

export interface CreateMazuItem {
  listId: string;
  name: string;
  amount: number;
  description: string;
}

// TODO: Declare extra reducer to change lists too
export const create = (state: ItemsState, action: PayloadAction<CreateMazuItem>) => {
  const { listId, name, amount, description } = action.payload;
  const id = Date.now().toString(); // TODO: Change ID generation?
  state.byId[id] = {
    id,
    listId,
    name,
    amount,
    description,
    isDone: false,
  };
  state.allIds = [...state.allIds, id].sort();
};

export const update = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], ...action.payload };
};

export const markAsDone = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isDone: true };
};

export const unmarkAsFavorite = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isDone: false };
};

export const remove = (state: ItemsState, action: PayloadAction<MazuItem>) => {
  const id = action.payload.id;
  delete state.byId[id];
  state.allIds = state.allIds.filter(anId => anId !== id);
};
