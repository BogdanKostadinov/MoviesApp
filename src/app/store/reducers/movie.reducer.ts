import { Action, createReducer, on } from '@ngrx/store';
import * as Actions from '../actions/movie.actions';
import { MovieState } from '../app.state';

export const movieFeatureKey = 'movie';

export const initialMovieState: MovieState = {
  movies: [],
  lastUpdated: null,
};

const _movieReducer = createReducer(
  initialMovieState,
  on(Actions.loadMoviesSuccess, (state, { movies }) => ({
    ...state,
    movies: movies,
    lastUpdated: new Date().toISOString(),
  })),
  on(Actions.updateMovie, (state, { movie }) => ({
    ...state,
    movies: state.movies.map((m) => (m.id === movie.id ? movie : m)),
    lastUpdated: new Date().toISOString(),
  })),
  on(Actions.deleteMovie, (state, { movieId }) => ({
    ...state,
    movies: state.movies.filter((m) => m.id !== movieId),
    lastUpdated: new Date().toISOString(),
  })),
);

export function moviesReducer(
  state: MovieState | undefined,
  action: Action,
): MovieState {
  return _movieReducer(state, action);
}
