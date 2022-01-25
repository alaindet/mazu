import { Item } from '../../../types';

export interface ItemsState {
  items: Item[];
  isLoading: boolean;
}

export const itemsInitialState: ItemsState = {
  items: [],
  isLoading: false,
};
