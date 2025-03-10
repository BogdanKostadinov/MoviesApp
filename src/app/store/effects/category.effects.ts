import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CategoryService } from '../../shared/services/category.service';
import * as CategoryActions from '../actions/category.actions';
import * as MovieActions from '../actions/movie.actions';

@Injectable()
export class CategoryEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private categoryService: CategoryService,
  ) {}

  getCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategories),
      mergeMap(() =>
        this.categoryService.getCategories().pipe(
          map((categories) =>
            categories.map((category) => ({
              ...category,
              selected: category.selected ?? false,
            })),
          ),
          map((categories) =>
            CategoryActions.getCategoriesSuccess({ categories }),
          ),
          catchError((error) =>
            of(CategoryActions.getCategoriesFailure({ error })),
          ),
        ),
      ),
    ),
  );

  getCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.getCategory),
      mergeMap((action) =>
        this.categoryService.getCategory(action.id).pipe(
          map((category) => CategoryActions.getCategorySuccess({ category })),
          catchError((error) =>
            of(CategoryActions.getCategoryFailure({ error })),
          ),
        ),
      ),
    ),
  );

  createCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategory),
      mergeMap((action) =>
        this.categoryService.createCategory(action.category).pipe(
          map((category) =>
            CategoryActions.createCategorySuccess({ category }),
          ),
          catchError((error) =>
            of(CategoryActions.createCategoryFailure({ error })),
          ),
        ),
      ),
    ),
  );

  createCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.createCategorySuccess),
      map(() => CategoryActions.getCategories()),
    ),
  );

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategory),
      mergeMap((action) =>
        this.categoryService.updateCategory(action.id, action.category).pipe(
          map((category) =>
            CategoryActions.updateCategorySuccess({ category }),
          ),
          catchError((error) =>
            of(CategoryActions.updateCategoryFailure({ error })),
          ),
        ),
      ),
    ),
  );

  updateCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.updateCategorySuccess),
      map(() => CategoryActions.getCategories()),
    ),
  );

  deleteCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategory),
      mergeMap((action) =>
        this.categoryService.deleteCategory(action.id).pipe(
          map(() => CategoryActions.deleteCategorySuccess({ id: action.id })),
          catchError((error) =>
            of(CategoryActions.deleteCategoryFailure({ error })),
          ),
        ),
      ),
    ),
  );

  deleteCategorySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.deleteCategorySuccess),
      mergeMap(() => [
        CategoryActions.getCategories(),
        MovieActions.loadMovies(),
      ]),
    ),
  );
}
