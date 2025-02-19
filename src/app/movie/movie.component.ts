import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  listOfMovieTitles: string[] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies) => {
      this.movies = movies;
    });
    this.listOfMovieTitles = this.movies.map((movie) => movie.title);
  }
}
