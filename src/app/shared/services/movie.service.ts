import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://localhost:44371';
  movies$: Observable<Movie[]> = this.getMovies();

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.url}/movies`)
      .pipe(catchError(this.handleError));
  }

  // add backend endpoint
  getMovie(id: string): Observable<Movie> {
    return this.getMovies().pipe(
      map((movies) => movies.find((movie) => movie.id === id) as Movie),
    );
  }

  // add backend endpoint
  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(`moviesUrl`, movie)
      .pipe(catchError(this.handleError));
  }

  // add backend endpoint
  updateMovie(id: string, updatedMovie: Partial<Movie>): Observable<Movie> {
    return this.http
      .put<Movie>(`${this.url}/${id}`, updatedMovie)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred; please try again later.';

    if (error.status === 404) {
      errorMessage =
        'No movies found. Please check the database or try again later.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`,
      );
    }

    return throwError(() => new Error(errorMessage));
  }
}
