import { createReducer, on } from '@ngrx/store';

import { itemsInitialState } from './state';
import * as fromActions from './actions';

export const itemsFeature = 'items';

const reducer = createReducer(
  itemsInitialState,

  // Create
  on(fromActions.createItemSuccess, (state, action) => {
    const { type, ...item } = action;
    const items = [...state.items, item];
    return { ...state, items, isLoading: false };
  }),

  // Get all
  on(fromActions.getAllItemsSuccess, (state, action) => {
    const { items } = action;
    return { ...state, items, isLoading: false };
  }),

  // Mark
  on(fromActions.markItemAsDoneSuccess, (state, action) => {
    const { itemId } = action;
    const items = state.items.map(item => item.itemId !== itemId ? item : {
      ...item,
      isDone: true,
    });
    return { ...state, items, isLoading: false };
  }),

  // Unmark
  on(fromActions.unmarkItemAsDoneSuccess, (state, action) => {
    const { itemId } = action;
    const items = state.items.map(item => item.itemId !== itemId ? item : {
      ...item,
      isDone: false,
    });
    return { ...state, items, isLoading: false };
  }),

  // Update
  on(fromActions.updateItemSuccess, (state, action) => {
    const { type, ...item } = action;
    const { itemId } = item;
    const items = state.items.map(anItem => anItem.itemId === itemId ? item : anItem);
    return { ...state, items, isLoading: false };
  }),

  // Delete
  on(fromActions.deleteItemSuccess, (state, action) => {
    const { itemId } = action;
    const items = state.items.filter(anItem => anItem.itemId !== itemId);
    return { ...state, items, isLoading: false };
  }),

  // Mark all as done
  on(fromActions.markAllItemsAsDoneSuccess, (state, action) => {
    const items = state.items.map(item => ({ ...item, isDone: true }));
    return { ...state, items, isLoading: false };
  }),

  // Unmark all as done
  on(fromActions.unmarkAllItemsAsDoneSuccess, (state, action) => {
    const items = state.items.map(item => ({ ...item, isDone: false }));
    return { ...state, items, isLoading: false };
  }),

  // Delete all
  on(fromActions.deleteAllItemsSuccess, (state, action) => {
    return { ...state, items: [], isLoading: false };
  }),

  // Delete all done items
  on(fromActions.deleteAllDoneItemsSuccess, (state, action) => {
    const items = state.items.filter(item => !item.isDone);
    return { ...state, items, isLoading: false };
  }),

  // Start async
  on(
    fromActions.createItem,
    fromActions.getAllItems,
    fromActions.markItemAsDone,
    fromActions.unmarkItemAsDone,
    fromActions.updateItem,
    fromActions.deleteItem,
    fromActions.markAllItemsAsDone,
    fromActions.unmarkAllItemsAsDone,
    fromActions.deleteAllItems,
    fromActions.deleteAllDoneItems,
    state => ({ ...state, isLoading: true })
  ),

  // Stop async
  on(
    fromActions.createItemFailure,
    fromActions.getAllItemsFailure,
    fromActions.markItemAsDoneFailure,
    fromActions.unmarkItemAsDoneFailure,
    fromActions.updateItemFailure,
    fromActions.deleteItemFailure,
    fromActions.markAllItemsAsDoneFailure,
    fromActions.unmarkAllItemsAsDoneFailure,
    fromActions.deleteAllItemsFailure,
    fromActions.deleteAllDoneItemsFailure,
    state => ({ ...state, isLoading: false })
  ),
);

export default reducer;
