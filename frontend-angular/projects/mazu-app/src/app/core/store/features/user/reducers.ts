import * as fromActions from './actions';
import { UserState } from './state';

export const signIn = (
  state: UserState,
  action: ReturnType<typeof fromActions.signIn>,
) => {
  const isLoading = true;
  return { ...state, isLoading };
};

export const signInSucces = (
  state: UserState,
  action: ReturnType<typeof fromActions.signInSuccess>,
) => {
  const isLoading = false;
  const jwt = action.jwt;
  return { ...state, isLoading, jwt };
};

// TODO: Manage error?
export const signInFailure = (
  state: UserState,
) => {
  const isLoading = false;
  return { ...state, isLoading };
};
