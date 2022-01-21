
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { ItemsService } from '../../../services';
import * as fromActions from './actions';

@Injectable()
export class ItemsEffects {

  create$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.createItem),
    mergeMap(action => {
      const { type, ...dto } = action;
      return this.itemsService.create(dto).pipe(
        map(res => fromActions.createItemSuccess(res.data)),
        catchError(res => of(fromActions.createItemFailure(res))),
      );
    }),
  ));

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.getAllItems),
    mergeMap(action => this.itemsService.getAll(action.listId).pipe(
      map(res => fromActions.getAllItemsSuccess({ items: res.data })),
      catchError(res => of(fromActions.getAllItemsFailure(res))),
    )),
  ));

  markAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.markItemAsDone),
    mergeMap(action => {
      const { listId, itemId } = action;
      return this.itemsService.markAsDone({ listId, itemId }).pipe(
        map(res => fromActions.markItemAsDoneSuccess({
          itemId,
          message: res.message,
        })),
        catchError(res => of(fromActions.markItemAsDoneFailure(res))),
      )
    }),
  ));

  unmarkAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.unmarkItemAsDone),
    mergeMap(action => {
      const { listId, itemId } = action;
      return this.itemsService.unmarkAsDone({ listId, itemId }).pipe(
        map(res => fromActions.unmarkItemAsDoneSuccess({
          itemId,
          message: res.message,
        })),
        catchError(res => of(fromActions.unmarkItemAsDoneFailure(res))),
      )
    }),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.updateItem),
    mergeMap(action => {
      const { type, ...dto } = action;
      return this.itemsService.update(dto).pipe(
        map(res => fromActions.updateItemSuccess(res.data)),
        catchError(res => of(fromActions.updateItemFailure(res))),
      );
    }),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.deleteItem),
    mergeMap(action => {
      const { listId, itemId } = action;
      return this.itemsService.delete({ listId, itemId }).pipe(
        map(res => fromActions.deleteItemSuccess({
          itemId,
          message: res.message,
        })),
        catchError(res => of(fromActions.deleteItemFailure(res))),
      );
    }),
  ));

  markAllAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.markAllItemsAsDone),
    mergeMap(action => this.itemsService.markAllAsDone(action.listId).pipe(
      map(res => fromActions.markAllItemsAsDoneSuccess(res)),
      catchError(res => of(fromActions.markAllItemsAsDoneFailure(res))),
    )),
  ));

  unmarkAllAsDone$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.unmarkAllItemsAsDone),
    mergeMap(action => this.itemsService.unmarkAllAsDone(action.listId).pipe(
      map(res => fromActions.unmarkAllItemsAsDoneSuccess(res)),
      catchError(res => of(fromActions.unmarkAllItemsAsDoneFailure(res))),
    )),
  ));

  deleteAll$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.deleteAllItems),
    mergeMap(action => this.itemsService.deleteAll(action.listId).pipe(
      map(res => fromActions.deleteAllItemsSuccess(res)),
      catchError(res => of(fromActions.deleteAllItemsFailure(res))),
    )),
  ));

  deleteAllDone$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.deleteAllDoneItems),
    mergeMap(action => this.itemsService.deleteAllMarkedAsDone(action.listId).pipe(
      map(res => fromActions.deleteAllDoneItemsFailure(res)),
      catchError(res => of(fromActions.deleteAllDoneItemsFailure(res))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
  ) {}
}
