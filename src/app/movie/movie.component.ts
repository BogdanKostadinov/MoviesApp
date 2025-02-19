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
  filteredMovies: Movie[] = [];
  searchValue = '';
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getMovies()
      .subscribe((movies) => (this.filteredMovies = this.movies = movies));
  }

  filterMovies() {
    this.filteredMovies = this.searchValue
      ? this.movies.filter((movie) =>
          movie.title.toLowerCase().includes(this.searchValue.toLowerCase()),
        )
      : this.movies;
  }

  clearSearch(): void {
    this.searchValue = '';
    this.filteredMovies = this.movies;
  }
}
