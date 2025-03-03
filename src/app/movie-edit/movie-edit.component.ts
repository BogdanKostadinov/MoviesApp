import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
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
  genreCtrl = new FormControl<string[]>([]);
  genres: { id: string; label: string }[] = [];
  currentYear = new Date().getFullYear() + 1;

  constructor(
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<MovieEditComponent>,
    private store: Store,
    public fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: 'add' | 'edit'; movie?: Movie },
  ) {}
  ngOnInit(): void {
    this.title = this.data.action === 'edit' ? 'Edit movie' : 'Add movie';
    this.categoryService.getCategories().subscribe((cat) => {
      cat.map((c) => {
        this.genres.push({ id: c.id, label: c.name });
      });

      console.log('Initial genre value:', this.data.movie?.genre);

      const initialGenres = Array.isArray(this.data.movie?.genre)
        ? this.data.movie.genre
        : [];
      this.genreCtrl.setValue(initialGenres);

      // Debugging: Log the value being set to genreCtrl
      console.log('Setting genreCtrl value:', initialGenres);
    });
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
      genre: this.genreCtrl,
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
