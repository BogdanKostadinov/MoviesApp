import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private moviesUrl = 'assets/mock-data/movies.json'; // Path to JSON file

  constructor(private http: HttpClient) {}

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
}
