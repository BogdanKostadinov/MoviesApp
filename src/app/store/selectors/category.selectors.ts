import { createSelector } from '@ngrx/store';
import { AppState, CategoryState } from '../app.state';

export const selectCategoryState = (state: AppState) => state.categories;

export const selectAllCategories = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.categories,
);

export const selectLastUpdated = createSelector(
  selectCategoryState,
  (state: CategoryState) => state.lastUpdated,
);
