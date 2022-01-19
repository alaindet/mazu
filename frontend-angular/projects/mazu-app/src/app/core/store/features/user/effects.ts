
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { AuthService } from '../../../services';
import { UserActionType, signInSuccess, signInFailure } from './actions';

@Injectable()
export class UserEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(UserActionType.SignIn),
    mergeMap(action => {
      const { username, password } = action;
      return this.authService.signIn(username, password).pipe(
        map(response => {
          const { jwt } = response;
          return signInSuccess({ jwt });
        }),
        catchError(() => of(signInFailure())),
      );
    }),
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}
}
