import { createAction, props } from '@ngrx/store';
import { Movie } from '../../shared/models/movie.model';

export const loadMovies = createAction('[Movie API] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movie API] Load Movies Success',
  props<{ movies: Movie[] }>(),
);

export const addMovie = createAction(
  '[Movie API] Add Movie',
  props<{ movie: Movie }>(),
);

export const updateMovie = createAction(
  '[Movie API] Update Movie',
  props<{ id: string; movie: Movie }>(),
);

export const deleteMovie = createAction(
  '[Movie API] Delete Movie',
  props<{ movieId: string }>(),
);
