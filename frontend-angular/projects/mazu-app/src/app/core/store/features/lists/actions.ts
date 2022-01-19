import { createAction, props } from '@ngrx/store';

export enum ListsActionType {

  Create = '[Lists] Create',
  CreateSuccess = '[Lists] Create success',
  CreateFailure = '[Lists] Create failure',

  GetAll = '[Lists] Get all',
  GetAllSuccess = '[Lists] Get all success',
  GetAllFailure = '[Lists] Get all failure',

  GetOne = '[Lists] Get one',
  GetOneSuccess = '[Lists] Get one success',
  GetOneFailure = '[Lists] Get one failure',

  MarkAsFavorite = '[Lists] Mark as favorite',
  MarkAsFavoriteSuccess = '[Lists] Mark as favorite success',
  MarkAsFavoriteFailure = '[Lists] Mark as favorite failure',

  UnmarkAsFavorite = '[Lists] Unmark as favorite',
  UnmarkAsFavoriteSuccess = '[Lists] Unmark as favorite success',
  UnmarkAsFavoriteFailure = '[Lists] Unmark as favorite failure',

  Update = '[Lists] Update',
  UpdateSuccess = '[Lists] Update success',
  UpdateFailure = '[Lists] Update failure',

  Delete = '[Items] Delete',
  DeleteSuccess = '[Items] Delete success',
  DeleteFailure = '[Items] Delete failure',

}

export const createList = createAction(ListsActionType.Create, props<{
  name: string;
  description: string;
}>());

export const createListSuccess = createAction(ListsActionType.CreateSuccess, props<{
  name: string;
  description: string;
  isFavorite: boolean;
}>());
