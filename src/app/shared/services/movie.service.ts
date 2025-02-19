import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
}
