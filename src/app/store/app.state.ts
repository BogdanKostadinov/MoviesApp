import { ActionReducerMap } from '@ngrx/store';
import { Movie } from '../shared/models/movie.model';
import { moviesReducer } from './reducers/movie.reducer';

export interface AppState {
  movies: MovieState;
}

export interface MovieState {
  movies: Movie[];
  lastUpdated: string | null;
}

export const reducers: ActionReducerMap<AppState> = {
  movies: moviesReducer,
};
