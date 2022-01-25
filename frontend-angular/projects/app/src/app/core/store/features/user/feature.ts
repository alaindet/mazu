import { createReducer, on } from '@ngrx/store';

import { userInitialState } from './state';
import * as fromActions from './actions';
import * as fromReducers from './reducers';

export const userFeature = 'user';

const reducer = createReducer(
  userInitialState,
  on(fromActions.signIn, fromReducers.signIn),
  on(fromActions.signInSuccess, fromReducers.signInSucces),
  on(fromActions.signInFailure, fromReducers.signInFailure),
);

export default reducer;
