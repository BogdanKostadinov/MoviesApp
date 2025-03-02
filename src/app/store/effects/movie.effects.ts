import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs';
import { MovieService } from '../../shared/services/movie.service';
import * as MovieActions from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovies),
      mergeMap(() =>
        this.movieService
          .getMovies()
          .pipe(map((movies) => MovieActions.loadMoviesSuccess({ movies }))),
      ),
    ),
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovie),
      mergeMap((action) =>
        this.movieService
          .addMovie(action.movie)
          .pipe(map((movie) => MovieActions.addMovie({ movie }))),
      ),
    ),
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.updateMovie),
      mergeMap((action) =>
        this.movieService
          .updateMovie(action.id, action.movie)
          .pipe(
            map((movie) => MovieActions.updateMovie({ id: movie.id, movie })),
          ),
      ),
    ),
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.deleteMovie),
      mergeMap((action) =>
        this.movieService
          .deleteMovie(action.movieId)
          .pipe(
            map(() => MovieActions.deleteMovie({ movieId: action.movieId })),
          ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private movieService: MovieService,
  ) {}
}
