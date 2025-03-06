import { Action, createReducer, on } from '@ngrx/store';
import * as CategoryActions from '../actions/category.actions';
import { CategoryState } from '../app.state';

export const categoryFeatureKey = 'category';

export const initialCategoryState: CategoryState = {
  categories: [],
  lastUpdated: null,
};

const _categoryReducer = createReducer(
  initialCategoryState,
  on(CategoryActions.getCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories.map((category) => ({
      ...category,
      selected: category.selected ?? false,
    })),
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.getCategoriesFailure, (state, { error }) => ({
    ...state,
    error: error,
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.getCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.map((c) =>
      c.id === category.id ? category : c,
    ),
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.getCategoryFailure, (state, { error }) => ({
    ...state,
    error: error,
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.createCategorySuccess, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category],
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.createCategoryFailure, (state, { error }) => ({
    ...state,
    error: error,
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.updateCategorySuccess, (state, { category }) => ({
    ...state,
    categories: state.categories.map((c) =>
      c.id === category.id ? { ...c, ...category } : c,
    ),
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.updateCategoryFailure, (state, { error }) => ({
    ...state,
    error: error,
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.deleteCategorySuccess, (state, { id }) => ({
    ...state,
    categories: state.categories.filter((c) => c.id !== id),
    lastUpdated: new Date().toISOString(),
  })),
  on(CategoryActions.deleteCategoryFailure, (state, { error }) => ({
    ...state,
    error: error,
    lastUpdated: new Date().toISOString(),
  })),
);

export function categoriesReducer(
  state: CategoryState | undefined,
  action: Action,
): CategoryState {
  return _categoryReducer(state, action);
}
