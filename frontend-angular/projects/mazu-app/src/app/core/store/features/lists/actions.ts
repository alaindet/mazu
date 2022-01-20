import { createAction, props } from '@ngrx/store';

import {
  CreateListDto,
  UpdateListDto,
  ImplicitUpdateListDto,
  List,
  TextFeedback,
} from '../../../types';

export const createList = createAction(
  '[Lists] Create',
  props<CreateListDto>(),
);
export const createListSuccess = createAction(
  '[Lists] Create success',
  props<List>(),
);
export const createListFailure = createAction(
  '[Lists] Create failure',
  props<TextFeedback>(),
);



export const getAllLists = createAction(
  '[Lists] Get all',
);
export const getAllListsSuccess = createAction(
  '[Lists] Get all success',
  props<{ lists: List[] }>(),
);
export const getAllListsFailure = createAction(
  '[Lists] Get all failure',
  props<TextFeedback>(),
);



export const getList = createAction(
  '[Lists] Get one',
  props<{ listId: List['listId']; }>(),
);
export const getListSuccess = createAction(
  '[Lists] Get one success',
  props<List>(),
);
export const getListFailure = createAction(
  '[Lists] Get one failure',
  props<TextFeedback>(),
);



export const markListAsFavorite = createAction(
  '[Lists] Mark as favorite',
  props<{ listId: List['listId']; }>(),
);
export const markListAsFavoriteSuccess = createAction(
  '[Lists] Mark as favorite success',
  props<TextFeedback>(),
);
export const markListAsFavoriteFailure = createAction(
  '[Lists] Mark as favorite failure',
  props<TextFeedback>(),
);



export const unmrkListAsFavorite = createAction(
  '[Lists] Unmark as favorite',
  props<ImplicitUpdateListDto>(),
);
export const unmarkListAsFavoriteSuccess = createAction(
  '[Lists] Unmark as favorite success',
  props<TextFeedback>(),
);
export const unmarkListAsFavoriteFailure = createAction(
  '[Lists] Unmark as favorite failure',
  props<TextFeedback>(),
);



export const updateList = createAction(
  '[Lists] Update list',
  props<UpdateListDto>(),
);
export const updateListSuccess = createAction(
  '[Lists] Update list success',
  props<TextFeedback>(),
);
export const updateListFailure = createAction(
  '[Lists] Update list failure',
  props<TextFeedback>(),
);



export const deleteList = createAction(
  '[Lists] Delete list',
  props<ImplicitUpdateListDto>(),
);
export const deleteListSuccess = createAction(
  '[Lists] Delete list success',
  props<TextFeedback>(),
);
export const deleteListFailure = createAction(
  '[Lists] Delete list failure',
  props<TextFeedback>(),
);
