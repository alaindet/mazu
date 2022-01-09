import { PayloadAction } from '@reduxjs/toolkit';

import { MazuList } from 'src/common/types';
import { ListsState } from './state';

export const create = (state: ListsState, action: PayloadAction<string>) => {
  const id = Date.now().toString(); // TODO: Change ID generation?
  state.byId[id] = {
    id,
    name: action.payload,
    isFavorite: false,
    itemsDoneCount: 0,
    itemsCount: 0,
  };
  state.allIds = [...state.allIds, id].sort();
};

export const update = (state: ListsState, action: PayloadAction<MazuList>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], ...action.payload };
};

export const markAsFavorite = (state: ListsState,  action: PayloadAction<MazuList>) => {
  for (const listId in state.byId) {
    if (state.byId[listId].isFavorite) {
      state.byId[listId].isFavorite = false;
      break;
    }
  }
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isFavorite: true };
};

export const unmarkAsFavorite = (state: ListsState, action: PayloadAction<MazuList>) => {
  const id = action.payload.id;
  state.byId[id] = { ...state.byId[id], isFavorite: false };
};

export const remove = (state: ListsState, action: PayloadAction<MazuList>) => {
  const id = action.payload.id;
  delete state.byId[id];
  state.allIds = state.allIds.filter(anId => anId !== id);
};
