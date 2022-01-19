import { createAction, props } from '@ngrx/store';

export enum ItemsActionType {

  Create = '[Items] Create',
  CreateSuccess = '[Items] Create success',
  CreateFailure = '[Items] Create failure',

  GetAll = '[Items] Get all',
  GetAllSuccess = '[Items] Get all success',
  GetAllFailure = '[Items] Get all failure',

  UpdateOne = '[Items] Update one',
  UpdateOneSuccess = '[Items] Update one success',
  UpdateOneFailure = '[Items] Update one failure',

  MarkOne = '[Items] Mark one',
  MarkOneSuccess = '[Items] Mark one success',
  MarkOneFailure = '[Items] Mark one failure',

  UnmarkOne = '[Items] Unmark one',
  UnmarkOneSuccess = '[Items] Unmark one success',
  UnmarkOneFailure = '[Items] Unmark one failure',

  DeleteOne = '[Items] Delete one',
  DeleteOneSuccess = '[Items] Delete one success',
  DeleteOneFailure = '[Items] Delete one failure',

  MarkAll = '[Items] Mark all',
  MarkAllSuccess = '[Items] Mark all success',
  MarkAllFailure = '[Items] Mark all failure',

  UnmarkAll = '[Items] Unmark all',
  UnmarkAllSuccess = '[Items] Unmark all success',
  UnmarkAllFailure = '[Items] Unmark all failure',

  DeleteAll = '[Items] Delete all',
  DeleteAllSuccess = '[Items] Delete all success',
  DeleteAllFailure = '[Items] Delete all failure',

  DeleteAllMarked = '[Items] Delete all marked',
  DeleteAllMarkedSuccess = '[Items] Delete all marked success',
  DeleteAllMarkedFailure = '[Items] Delete all marked failure',

}
