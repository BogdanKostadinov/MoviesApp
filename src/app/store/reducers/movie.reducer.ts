import { Action, createReducer, on } from '@ngrx/store';
import { Movie } from '../../shared/models/movie.model';
import * as Actions from '../actions/movie.actions';
import { MovieState } from '../app.state';

export const movieFeatureKey = 'movie';

const dummy_movies: Movie[] = [
  {
    id: '1',
    title: 'Inception',
    genre: ['Sci-Fi'],
    releaseYear: 2010,
    director: 'Christopher Nolan',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    genre: ['Action'],
    releaseYear: 2008,
    director: 'Christopher Nolan',
  },
  {
    id: '3',
    title: 'Interstellar',
    genre: ['Sci-Fi'],
    releaseYear: 2014,
    director: 'Christopher Nolan',
  },
];

export const initialMovieState: MovieState = {
  movies: dummy_movies,
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
