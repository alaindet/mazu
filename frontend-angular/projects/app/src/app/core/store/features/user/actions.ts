import { createAction, props } from '@ngrx/store';

export const signIn = createAction(
  '[User] Sign in',
  props<{ email: string; password: string }>()
);

export const signInSuccess = createAction(
  '[User] Sign in success',
  props<{ jwt: string; }>()
);

export const signInFailure = createAction(
  '[User] Sign in failure',
);
