
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { UserActionType } from './actions';

@Injectable()
export class UserEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionType.SignIn),
    // TODO: Example
    // mergeMap(action => this.booksService.getBooks().pipe(
    //   map(books => retrieveBooksListSuccess({ books })),
    //   catchError(() => of(retrieveBooksListFailure())),
    // )),
  ));

  constructor(
    private actions$: Actions,
    // private booksService: BooksService,
  ) {}
}
