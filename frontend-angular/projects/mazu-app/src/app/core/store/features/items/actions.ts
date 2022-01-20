import { createAction, props } from '@ngrx/store';

// TODO: Move interfaces away
export interface CreateItemDto {
  listId: string;
  name: string;
  amount: number;
  description?: string;
}

export interface UpdateItemDto {
  itemId: string;
  listId: string;
  name?: string;
  amount?: number;
  description?: string;
  isDone?: boolean;
}

export interface Item {
  itemId: string;
  listId: string;
  name: string;
  amount: number;
  description: string;
  isDone: boolean;
}

export interface ImplicitUpdateItemDto {
  listId: string;
  itemId: string;
}

export interface ImplicitUpdateListDto {
  listId: string;
}

export interface TextFeedback {
  message: string;
}

export const createItem = createAction(
  '[Items] Create',
  props<CreateItemDto>(),
);
export const createItemSuccess = createAction(
  '[Items] Create success',
  props<Item>(),
);
export const createItemFailure = createAction(
  '[Items] Create failure',
  props<TextFeedback>(),
);



export const getAllItems = createAction(
  '[Items] Get all',
);
export const getAllItemsSuccess = createAction(
  '[Items] Get all success',
  props<{ items: Item[] }>(),
);
export const getAllItemsFailure = createAction(
  '[Items] Get all failure',
  props<TextFeedback>(),
);



export const updateItem = createAction(
  '[Items] Update',
  props<UpdateItemDto>(),
);
export const updateItemSuccess = createAction(
  '[Items] Update success',
  props<Item>(),
);
export const updateItemFailure = createAction(
  '[Items] Update failure',
  props<TextFeedback>(),
);



export const markItemAsDone = createAction(
  '[Items] Mark as done',
  props<ImplicitUpdateItemDto>(),
);
export const markItemAsDoneSuccess = createAction(
  '[Items] Mark as done success',
  props<TextFeedback>(),
);
export const markItemAsDoneFailure = createAction(
  '[Items] Mark as done failure',
  props<TextFeedback>(),
);



export const unmarkItemAsDone = createAction(
  '[Items] Unmark as done',
  props<ImplicitUpdateItemDto>(),
);
export const unmarkItemAsDoneSuccess = createAction(
  '[Items] Unmark as done success',
  props<TextFeedback>(),
);
export const unmarkItemAsDoneFailure = createAction(
  '[Items] Unmark as done failure',
  props<TextFeedback>(),
);



export const deleteItem = createAction(
  '[Items] Delete',
  props<ImplicitUpdateItemDto>(),
);
export const deleteItemSuccess = createAction(
  '[Items] Delete success',
  props<TextFeedback>(),
);
export const deleteItemFailure = createAction(
  '[Items] Delete failure',
  props<TextFeedback>(),
);



export const markAllItemsAsDone = createAction(
  '[Items] Mark all as done',
  props<ImplicitUpdateListDto>(),
);
export const markAllItemsAsDoneSuccess = createAction(
  '[Items] Mark all as done success',
  props<TextFeedback>(),
);
export const markAllItemsAsDoneFailure = createAction(
  '[Items] Mark all as done failure',
  props<TextFeedback>(),
);



export const unmarkAllItemsAsDone = createAction(
  '[Items] Unmark all as done',
  props<ImplicitUpdateListDto>(),
);
export const unmarkAllItemsAsDoneSuccess = createAction(
  '[Items] Unmark all as done success',
  props<TextFeedback>(),
);
export const unmarkAllItemsAsDoneFailure = createAction(
  '[Items] Unmark all as done failure',
  props<TextFeedback>(),
);



export const deleteAllItems = createAction(
  '[Items] Delete all',
  props<ImplicitUpdateListDto>(),
);
export const deleteAllItemsSuccess = createAction(
  '[Items] Delete all success',
  props<TextFeedback>(),
);
export const deleteAllItemsFailure = createAction(
  '[Items] Delete all failure',
  props<TextFeedback>(),
);



export const deleteAllDoneItems = createAction(
  '[Items] Delete all done',
  props<ImplicitUpdateListDto>(),
);
export const deleteAllDoneItemsSuccess = createAction(
  '[Items] Delete all done success',
  props<TextFeedback>(),
);
export const deleteAllDoneItemsFailure = createAction(
  '[Items] Delete all done failure',
  props<TextFeedback>(),
);
