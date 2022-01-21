import { createReducer, on } from '@ngrx/store';

import { listsInitialState } from './state';
import * as fromActions from './actions';

export const listsFeature = 'lists';

const reducer = createReducer(
  listsInitialState,

  // Create
  on(fromActions.createListSuccess, (state, action) => {
    const { type, ...list } = action;
    const lists = [...state.lists, list];
    return { ...state, lists, isLoading: false };
  }),

  // Get all
  on(fromActions.getAllListsSuccess, (state, action) => {
    const { lists } = action;
    return { ...state, lists, isLoading: false };
  }),

  // Get one
  // TODO: Populate items instead
  // on(fromActions.getListSuccess, (state, action) => {
  //   const { type, ...list } = action;
  //   return { ...state, lists: [...state.lists, list], isLoading: false };
  // }),

  // Update
  on(
    fromActions.markListAsFavoriteSuccess,
    fromActions.unmarkListAsFavoriteSuccess,
    fromActions.updateListSuccess,
    (state, action) => {
    const { type, ...list } = action;
    const listId = list.listId;
    const lists = state.lists.map(aList => aList.listId === listId ? list : aList);
    return { ...state, lists, isLoading: false };
  }),

  // Delete
  on(fromActions.deleteListSuccess, (state, action) => {
    const lists = state.lists.filter(list => list.listId !== action.listId);
    return { ...state, lists, isLoading: false };
  }),

  // Start async
  on(
    fromActions.createList,
    fromActions.getAllLists,
    fromActions.getList,
    fromActions.markListAsFavorite,
    fromActions.unmarkListAsFavorite,
    fromActions.updateList,
    fromActions.deleteList,
    state => ({ ...state, isLoading: true })
  ),

  // Stop async
  on(
    fromActions.createListFailure,
    fromActions.getAllListsFailure,
    fromActions.getListFailure,
    fromActions.markListAsFavoriteFailure,
    fromActions.unmarkListAsFavoriteFailure,
    fromActions.updateListFailure,
    fromActions.deleteListFailure,
    state => ({ ...state, isLoading: false })
  ),
);

export default reducer;
