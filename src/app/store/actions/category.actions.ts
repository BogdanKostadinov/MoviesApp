import { createAction, props } from '@ngrx/store';
import { Category, CategoryToEdit } from '../../shared/models/category.model';

// Action to get all categories
export const getCategories = createAction('[Category] Get Categories');
export const getCategoriesSuccess = createAction(
  '[Category] Get Categories Success',
  props<{ categories: Category[] }>(),
);
export const getCategoriesFailure = createAction(
  '[Category] Get Categories Failure',
  props<{ error: any }>(),
);

// Action to get a single category by id
export const getCategory = createAction(
  '[Category] Get Category',
  props<{ id: string }>(),
);
export const getCategorySuccess = createAction(
  '[Category] Get Category Success',
  props<{ category: Category }>(),
);
export const getCategoryFailure = createAction(
  '[Category] Get Category Failure',
  props<{ error: any }>(),
);

// Action to create a new category
export const createCategory = createAction(
  '[Category] Create Category',
  props<{ category: CategoryToEdit }>(),
);
export const createCategorySuccess = createAction(
  '[Category] Create Category Success',
  props<{ category: Category }>(),
);
export const createCategoryFailure = createAction(
  '[Category] Create Category Failure',
  props<{ error: any }>(),
);

// Action to update an existing category
export const updateCategory = createAction(
  '[Category] Update Category',
  props<{id: string, category: Category }>(),
);
export const updateCategorySuccess = createAction(
  '[Category] Update Category Success',
  props<{ category: Category }>(),
);
export const updateCategoryFailure = createAction(
  '[Category] Update Category Failure',
  props<{ error: any }>(),
);

// Action to delete a category by id
export const deleteCategory = createAction(
  '[Category] Delete Category',
  props<{ id: string }>(),
);
export const deleteCategorySuccess = createAction(
  '[Category] Delete Category Success',
  props<{ id: string }>(),
);
export const deleteCategoryFailure = createAction(
  '[Category] Delete Category Failure',
  props<{ error: any }>(),
);
