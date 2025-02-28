import { createSelector } from '@ngrx/store';
import { AppState, MovieState } from '../app.state';

export const selectMovieState = (state: AppState) => state.movies;

export const selectAllMovies = createSelector(
  selectMovieState,
  (state: MovieState) => state.movies,
);

export const selectLastUpdated = createSelector(
  selectMovieState,
  (state: MovieState) => state.lastUpdated,
);
