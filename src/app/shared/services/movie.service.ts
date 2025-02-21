import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  //TODO replace with real API URL
  private moviesUrl = 'assets/mock-data/movies.json';
  private testUrl = 'https://localhost:44371/WeatherForecast';
  movies$: Observable<Movie[]> = this.getMovies();

  constructor(private http: HttpClient) {
    this.test();
  }

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<{ movies: Movie[] }>(this.moviesUrl)
      .pipe(map((response) => response.movies));
  }

  getMovie(id: string): Observable<Movie> {
    return this.getMovies().pipe(
      map((movies) => movies.find((movie) => movie.id === id) as Movie),
    );
  }
  //TODO: Replace the test method
  test(): void {
    this.http.get(this.testUrl).subscribe((data) => {
      console.log(data);
    });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http
      .post<Movie>(`moviesUrl`, movie)
      .pipe(catchError(this.handleError));
  }

  updateMovie(id: string, updatedMovie: Partial<Movie>): Observable<Movie> {
    return this.http
      .put<Movie>(`${this.moviesUrl}/${id}`, updatedMovie)
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
