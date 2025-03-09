import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MovieEditComponent } from '../movie-edit/movie-edit.component';
import { Category } from '../shared/models/category.model';
import { Movie } from '../shared/models/movie.model';
import * as MovieActions from '../store/actions/movie.actions';
import { AppState } from '../store/app.state';
import {
  selectAllMovies,
  selectLastUpdated,
} from '../store/selectors/movie.selectors';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.scss',
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  filteredMovies: Movie[] = [];
  movieCategories: Category[] = [];
  searchValue = '';

  movies$: Observable<Movie[]>;
  lastUpdated$: Observable<string | null>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private store: Store<AppState>,
  ) {
    this.movies$ = this.store.select(selectAllMovies);
    this.lastUpdated$ = this.store.select(selectLastUpdated);
  }

  ngOnInit(): void {
    this.store.dispatch(MovieActions.loadMovies());
    this.movies$.subscribe((movies) => {
      this.filteredMovies = this.movies = movies;
      this.applyFilters();
    });
  }

  onApplyChips(category: Category): void {
    const existingCategory = this.movieCategories.find(
      (cat) => cat.id === category.id,
    );
    if (existingCategory) {
      existingCategory.selected = category.selected;
    } else {
      this.movieCategories.push(category);
    }
    this.movieCategories = this.movieCategories.filter((cat) => cat.selected);
    this.applyFilters();
  }

  applyFilters(): void {
    const selectedCategories = this.movieCategories.filter(
      (cat) => cat.selected,
    );
    this.filteredMovies = this.movies.filter(
      (movie) =>
        (!selectedCategories.length ||
          selectedCategories.some((cat) =>
            movie.categories.some((c) => c.name === cat.name),
          )) &&
        (!this.searchValue ||
          movie.title.toLowerCase().includes(this.searchValue.toLowerCase())),
    );
  }

  onSearchValueChange(searchValue: string): void {
    this.searchValue = searchValue;
    this.applyFilters();
  }

  openDialog(data: { action: string; movie?: Movie }): void {
    const dialogRef = this.dialog.open(MovieEditComponent, {
      width: '600px',
      data,
    });

    dialogRef.afterClosed().subscribe();
  }

  navigateToMovie(movieId: string): void {
    this.router.navigate(['movies', movieId]);
  }

  deleteMovieRequest(movie: Movie): void {
    this.store.dispatch(MovieActions.deleteMovie({ movieId: movie.id }));
  }

  clearDeletedCategory(category: Category): void {
    this.movieCategories = this.movieCategories.filter(
      (cat) => cat.id !== category.id,
    );
    this.applyFilters();
  }

  getCategoryNames(movie: Movie): string {
    return (
      movie.categories.map((category: any) => category.name).join(', ') || ''
    );
  }
}
