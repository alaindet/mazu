import { createReducer, on } from '@ngrx/store';

import { listsInitialState } from './state';
import * as fromActions from './actions';

export const listsFeature = 'lists';

const reducer = createReducer(
  listsInitialState,
  on(fromActions.createListSuccess, (state, action) => {
    const { type, ...list } = action;
    const lists = [...state.lists, list];
    return { ...state, lists, isLoading: false };
  }),
  on(fromActions.getAllListsSuccess, (state, action) => {
    const { lists } = action;
    return { ...state, lists, isLoading: false };
  }),
  // Populate items instead
  // on(fromActions.getListSuccess, (state, action) => {
  //   const { type, ...list } = action;
  //   return { ...state, lists: [...state.lists, list], isLoading: false };
  // }),
  on(fromActions.markListAsFavoriteSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      lists: state.lists.map(list => list.listId !== action.listId ? list : {
        ...list,
        isFavorite: true
      }),
    };
  }),
  on(fromActions.unmarkListAsFavoriteSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      lists: state.lists.map(list => list.listId !== action.listId ? list : {
        ...list,
        isFavorite: false
      }),
    };
  }),
  on(fromActions.updateListSuccess, (state, action) => {
    const { type, ...list } = action;
    const { listId } = list;
    const lists = state.lists.map(aList => aList.listId === listId ? list : aList);
    return { ...state, lists, isLoading: false };
  }),
  on(fromActions.deleteListSuccess, (state, action) => {
    const lists = state.lists.filter(list => list.listId !== action.listId);
    return { ...state, lists, isLoading: false };
  }),
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
