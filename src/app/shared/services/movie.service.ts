import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Movie, MovieToEdit } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private url = 'https://localhost:44371/movies';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http
      .get<Movie[]>(`${this.url}`)
      .pipe(catchError(this.handleError));
  }

  getMovie(id: string): Observable<Movie> {
    return this.http
      .get<Movie>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  addMovie(movie: MovieToEdit): Observable<Movie> {
    return this.http
      .post<Movie>(`${this.url}`, movie)
      .pipe(catchError(this.handleError));
  }

  updateMovie(id: string, updatedMovie: MovieToEdit): Observable<Movie> {
    const patchDoc = this.createPatchDocument(updatedMovie);

    return this.http
      .patch<Movie>(`${this.url}/${id}`, patchDoc, {
        headers: {
          'Content-Type': 'application/json-patch+json',
        },
      })
      .pipe(catchError(this.handleError));
  }

  deleteMovie(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
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

  private createPatchDocument(updatedMovie: Partial<MovieToEdit>): any[] {
    const patchDoc: any[] = [];

    // Define a mapping of property names to their corresponding JSON paths
    const propertyPaths: { [key: string]: string } = {
      title: '/title',
      director: '/director',
      releaseYear: '/releaseYear',
      categoryIds: '/categoryIds',
    };

    // Iterate over the properties and add patch operations for defined properties
    for (const key in propertyPaths) {
      if (updatedMovie[key as keyof MovieToEdit] !== undefined) {
        patchDoc.push({
          op: 'replace',
          path: propertyPaths[key],
          value: updatedMovie[key as keyof MovieToEdit],
        });
      }
    }

    return patchDoc;
  }
}
