import { createReducer, on } from '@ngrx/store';

import { uiInitialState } from './state';
import * as fromActions from './actions';

export const uiFeature = 'ui';

const reducer = createReducer(
  uiInitialState,

  on(fromActions.setTitle, (state, action) => {
    const { title } = action;
    return { ...state, title };
  }),
);

export default reducer;
