
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import { deleteList, unmarkListAsFavorite } from '.';

import { ListsService } from '../../../services';
import { createList, getAllLists, getList, markListAsFavorite, updateList } from './actions';

// TODO
@Injectable()
export class ListsEffects {

  create$ = createEffect(() => this.actions$.pipe(
    ofType(createList),
    // TODO...
  ));

  getAll$ = createEffect(() => this.actions$.pipe(
    ofType(getAllLists),
  ));

  getOne$ = createEffect(() => this.actions$.pipe(
    ofType(getList),
  ));

  markAsFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(markListAsFavorite),
  ));

  unmarkAsFavorite$ = createEffect(() => this.actions$.pipe(
    ofType(unmarkListAsFavorite),
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(updateList),
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(deleteList),
  ));

  constructor(
    private actions$: Actions,
    private listsService: ListsService,
  ) {}
}
