import { createAction, props } from '@ngrx/store';

export const setTitle = createAction(
  '[UI] Set title',
  props<{ title: string; }>(),
);

// TODO...
