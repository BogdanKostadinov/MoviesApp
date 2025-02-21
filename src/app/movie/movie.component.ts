import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { MatChipSelectionChange } from '@angular/material/chips';

export interface Category {
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  movieCategories: Category[] = [
    { name: 'Action', selected: false },
    { name: 'Adventure', selected: false },
    { name: 'Comedy', selected: false },
    { name: 'Drama', selected: false },
    { name: 'Horror', selected: false },
  ];
  searchValue = '';
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.movieService
      .getMovies()
      .subscribe((movies) => (this.filteredMovies = this.movies = movies));
  }

  selectChip(event: MatChipSelectionChange, category: Category): void {
    category.selected = event.selected;
    this.movieCategories = this.movieCategories.map((cat) =>
      cat.name === category.name ? category : cat,
    );
    this.filterMoviesByCategory();
  }

  filterMoviesByCategory(): void {
    this.filteredMovies =
      this.movieCategories.filter((cat) => cat.selected).length > 0
        ? this.movies.filter((movie) =>
            this.movieCategories
              .filter((cat) => cat.selected)
              .some((cat) => movie.genre.includes(cat.name)),
          )
        : this.movies;
  }

  searchMovies() {
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
