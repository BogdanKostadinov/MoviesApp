import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { Movie, MovieToAdd } from '../shared/models/movie.model';
import { CategoryService } from '../shared/services/category.service';
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
  currentYear = new Date().getFullYear() + 1;

  constructor(
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
      title: [
        this.data.movie?.title || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      genre: [
        this.data.movie?.genre || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      releaseYear: [
        this.data.movie?.releaseYear || '',
        [
          Validators.required,
          Validators.min(1888),
          Validators.max(this.currentYear + 1),
        ],
      ],
      director: [
        this.data.movie?.director || '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
    });
  }
  saveMovie(action: string): void {
    if (!this.validateForm()) return;

    const movieToSave: MovieToAdd = this.form.value;

    if (action === 'add') {
      this.store.dispatch(MovieActions.addMovie({ movie: movieToSave }));
    } else {
      this.store.dispatch(
        MovieActions.updateMovie({
          id: this.data.movie!.id,
          movie: {
            ...this.data.movie,
            ...movieToSave,
            id: this.data.movie!.id,
          },
        }),
      );
    }

    this.dialogRef.close({ success: true, action: this.data.action });
  }

  validateForm(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
    return this.form.valid;
  }

  showError(controlName: string, ...errors: string[]): boolean {
    const control = this.form.get(controlName);
    if (!control) return false;

    return errors.some((error) => control.hasError(error));
  }

  navigateBack(): void {
    this.dialogRef.close({ success: false });
  }
}
