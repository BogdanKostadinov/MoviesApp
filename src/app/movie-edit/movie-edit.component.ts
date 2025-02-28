import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { Movie } from '../shared/models/movie.model';
import { CategoryService } from '../shared/services/category.service';
import { MovieService } from '../shared/services/movie.service';
import * as MovieActions from '../store/actions/movie.actions';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.scss',
})
export class MovieEditComponent implements OnInit {
  title!: string;
  form!: FormGroup;
  categories$: Observable<Category[]>;

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<MovieEditComponent>,
    private store: Store,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: 'add' | 'edit'; movie?: Movie },
  ) {
    this.categories$ = this.categoryService.getCategories();
  }
  ngOnInit(): void {
    this.title = this.data.action === 'edit' ? 'Edit movie' : 'Add movie';
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      title: [this.data.movie?.title || '', Validators.required],
    });
  }

  addMovie(): void {
    if (this.form.invalid) return;
    const movieToSave: Partial<Movie> = this.form.value;
    if (this.data.action === 'add') {
      this.movieService.addMovie(movieToSave as Movie).subscribe(() => {
        this.dialogRef.close({ success: true, action: 'add' });
      });
    } else if (this.data.action === 'edit' && this.data.movie) {
      const movieToUpdate: Movie = {
        ...this.data.movie,
        ...movieToSave,
      } as Movie;
      this.movieService
        .updateMovie(movieToUpdate.id as string, movieToUpdate)
        .subscribe(() => {
          this.store.dispatch(
            MovieActions.updateMovie({ movie: movieToUpdate }),
          );
          this.dialogRef.close({ success: true, action: 'edit' });
        });
    }
  }

  navigateBack(): void {
    this.dialogRef.close({ success: false });
  }
}
