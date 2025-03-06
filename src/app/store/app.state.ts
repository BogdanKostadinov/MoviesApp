import { ActionReducerMap } from '@ngrx/store';
import { Category } from '../shared/models/category.model';
import { Movie } from '../shared/models/movie.model';
import { moviesReducer } from './reducers/movie.reducer';
import { categoriesReducer } from './reducers/category.reducer';

export interface CategoryState {
  categories: Category[];
  lastUpdated: string | null;
}

export interface MovieState {
  movies: Movie[];
  lastUpdated: string | null;
}

export interface AppState {
  movies: MovieState;
  categories: CategoryState;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
  categories: categoriesReducer,
};
