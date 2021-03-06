
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { AuthService } from '../../../services';
import { signIn, signInSuccess, signInFailure } from './actions';

@Injectable()
export class UserEffects {

  signIn$ = createEffect(() => this.actions$.pipe(
    ofType(signIn),
    mergeMap(action => {
      const { email, password } = action;
      return this.authService.signIn(email, password).pipe(
        map(response => {
          const jwt = response.data?.jwt as string;
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
