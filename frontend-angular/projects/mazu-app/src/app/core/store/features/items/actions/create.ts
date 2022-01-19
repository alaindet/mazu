import { createAction, props } from '@ngrx/store';
import { MazuItem } from 'projects/mazu-app/src/app/features/items';

// TODO: Move elsewhere
export interface CreateMazuItemDto {
  listId: string;
  name: string;
  amount: number;
  description?: string;
}

export const createItem = createAction(
  '[Items] Create item',
  props<CreateMazuItemDto>()
);

export const createItemSuccess = createAction(
  '[Items] Create item success',
  props<MazuItem>(),
);

export const createItemFailure = createAction(
  '[Items] Create item failure',
);
