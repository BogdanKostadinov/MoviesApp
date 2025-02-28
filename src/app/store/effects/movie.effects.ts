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

  constructor(
    private actions$: Actions,
    private store: Store,
    private movieService: MovieService,
  ) {}
}
