import { createAction, props } from '@ngrx/store';
import { Movie, MovieToEdit } from '../../shared/models/movie.model';

export const loadMovies = createAction('[Movie API] Load Movies');

export const loadMoviesSuccess = createAction(
  '[Movie API] Load Movies Success',
  props<{ movies: Movie[] }>(),
);
export const loadMoviesFailure = createAction(
  '[Movie API] Load Movie Failure',
  props<{ error: any }>(),
);

export const addMovie = createAction(
  '[Movie API] Add Movie',
  props<{ movie: MovieToEdit }>(),
);

export const addMovieSuccess = createAction(
  '[Movie API] Add Movie Success',
  props<{ movie: Movie }>(),
);

export const addMovieFailure = createAction(
  '[Movie API] Add Movie Failure',
  props<{ error: any }>(),
);

export const updateMovie = createAction(
  '[Movie API] Update Movie',
  props<{ id: string; movie: MovieToEdit }>(),
);

export const updateMovieSuccess = createAction(
  '[Movie API] Update Movie Success',
  props<{ movie: Movie }>(),
);

export const updateMovieFailure = createAction(
  '[Movie API] Update Movie Failure',
  props<{ error: any }>(),
);

export const deleteMovie = createAction(
  '[Movie] Delete Movie',
  props<{ movieId: string }>(),
);

export const deleteMovieSuccess = createAction(
  '[Movie] Delete Movie Success',
  props<{ movieId: string }>(),
);

export const deleteMovieFailure = createAction(
  '[Movie] Delete Movie Failure',
  props<{ error: any }>(),
);
