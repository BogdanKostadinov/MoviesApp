import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MovieService } from '../../shared/services/movie.service';
import * as MovieActions from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.loadMovies),
      mergeMap(() =>
        this.movieService.getMovies().pipe(
          map((movies) => MovieActions.loadMoviesSuccess({ movies })),
          catchError((error) => of(MovieActions.loadMoviesFailure({ error }))),
        ),
      ),
    ),
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovie),
      mergeMap((action) =>
        this.movieService.addMovie(action.movie).pipe(
          map((movie) => MovieActions.addMovieSuccess({ movie })),
          catchError((error) => of(MovieActions.addMovieFailure({ error }))),
        ),
      ),
    ),
  );

  addMovieSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.addMovieSuccess),
      map(() => MovieActions.loadMovies()),
    ),
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.updateMovie),
      mergeMap((action) =>
        this.movieService.updateMovie(action.id, action.movie).pipe(
          map((movie) => MovieActions.updateMovieSuccess({ movie })),
          catchError((error) => of(MovieActions.updateMovieFailure({ error }))),
        ),
      ),
    ),
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.deleteMovie),
      mergeMap((action) =>
        this.movieService.deleteMovie(action.movieId).pipe(
          map(() =>
            MovieActions.deleteMovieSuccess({ movieId: action.movieId }),
          ),
          catchError((error) => of(MovieActions.deleteMovieFailure({ error }))),
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
