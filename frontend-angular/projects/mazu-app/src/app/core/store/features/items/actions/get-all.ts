import { createAction, props } from '@ngrx/store';

import { MazuItem } from 'projects/mazu-app/src/app/features/items';

export const getAllItems = createAction(
  '[Items] Get all items',
  props<{ listId: string; }>()
);

export const getAllItemsSuccess = createAction(
  '[Items] Get all items success',
  props<{ items: MazuItem[] }>()
);

export const getAllItemsFailure = createAction(
  '[Items] Get all items failure',
);
