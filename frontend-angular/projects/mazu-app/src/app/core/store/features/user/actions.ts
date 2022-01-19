import { createAction, props } from '@ngrx/store';

export enum UserActionType {
  SignIn = '[User] Sign in',
  SignInSuccess = '[User] Sign in success',
  SignInFailure = '[User] Sign in failure',
}

export const signIn = createAction(
  UserActionType.SignIn,
  props<{ username: string; password: string }>()
);

export const signInSuccess = createAction(
  UserActionType.SignInSuccess,
  props<{ jwt: string; }>()
);

export const signInFailure = createAction(
  UserActionType.SignInFailure,
);
