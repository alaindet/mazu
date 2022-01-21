
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { ListsService } from '../../../services';
import * as fromActions from './actions';

@Injectable()
export class ListsEffects {

  create$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.createList),
    mergeMap(action => {
      const { type, ...dto } = action;
      return this.listsService.create(dto).pipe(
        map(res => fromActions.createListSuccess(res.data)),
        catchError(res => of(fromActions.createListFailure(res))),
      );
    }),
  ));

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAllLists),
    mergeMap(() => this.listsService.getAll().pipe(
      map(res => fromActions.getAllListsSuccess({ lists: res.data })),
      catchError(res => of(fromActions.getAllListsFailure(res))),
    )),
  ));

  // getOne$ = createEffect(() => this.actions$.pipe(
  //   ofType(fromActions.getList),
  //   mergeMap(action => this.listsService.getOne(action.listId).pipe(
  //     map(res => fromActions.getListSuccess(res.data)),
  //     catchError(res => of(fromActions.getListFailure(res))),
  //   )),
  // ));

  markAsFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.markListAsFavorite),
    mergeMap(action => this.listsService.markAsFavorite(action.listId).pipe(
      map(res => fromActions.markListAsFavoriteSuccess({
        listId: action.listId,
        message: res.message,
      })),
      catchError(res => of(fromActions.markListAsFavoriteFailure(res))),
    )),
  ));

  unmarkAsFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.unmarkListAsFavorite),
    mergeMap(action => this.listsService.unmarkAsFavorite(action.listId).pipe(
      map(res => fromActions.unmarkListAsFavoriteSuccess({
        listId: action.listId,
        message: res.message,
      })),
      catchError(res => of(fromActions.unmarkListAsFavoriteFailure(res))),
    )),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.updateList),
    mergeMap(action => {
      const { type, ...dto } = action;
      return this.listsService.update(dto).pipe(
        map(res => fromActions.updateListSuccess(res.data)),
        catchError(res => of(fromActions.updateListFailure(res))),
      );
    }),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.deleteList),
    mergeMap(action => this.listsService.delete(action.listId).pipe(
      map(res => fromActions.deleteListSuccess({
        listId: action.listId,
        message: res.message,
      })),
      catchError(res => of(fromActions.deleteListFailure(res))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private listsService: ListsService,
  ) {}
}
