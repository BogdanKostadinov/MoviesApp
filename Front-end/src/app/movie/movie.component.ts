import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MovieEditComponent } from '../movie-edit/movie-edit.component';
import { Movie } from '../shared/models/movie.model';
import { CategoryService } from '../shared/services/category.service';
import { MovieService } from '../shared/services/movie.service';

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
  @Output() refreshTasksEvent = new EventEmitter<void>();
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  movieCategories: Category[] = [];
  searchValue = '';
  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.movieService
      .getMovies()
      .subscribe((movies) => (this.filteredMovies = this.movies = movies));
    this.categoryService
      .getCategories()
      .subscribe((categories) => (this.movieCategories = categories));
  }

  selectChip(event: MatChipSelectionChange, category: Category): void {
    category.selected = event.selected;
    this.movieCategories = this.movieCategories.map((cat) =>
      cat.name === category.name ? category : cat,
    );
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredMovies = this.movies;
    if (this.movieCategories.filter((cat) => cat.selected).length > 0) {
      filteredMovies = filteredMovies.filter((movie) =>
        this.movieCategories
          .filter((cat) => cat.selected)
          .some((cat) => movie.genre.includes(cat.name)),
      );
    }
    if (this.searchValue) {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchValue.toLowerCase()),
      );
    }
    this.filteredMovies = filteredMovies;
  }

  searchMovies() {
    this.applyFilters();
  }

  clearSearch(): void {
    this.searchValue = '';
    this.applyFilters();
  }

  navigateToMovie(movieId: string): void {
    this.router.navigate(['movies', movieId]);
  }

  openDialog(data: { action: string; movie?: Movie }): void {
    const dialogRef = this.dialog.open(MovieEditComponent, {
      width: '400px',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.success) {
        this.refreshTasksEvent.emit();
      }
    });
  }

  deleteMovieRequest(movie: Movie): void {
    console.log('Delete movie request', movie);
  }
}
