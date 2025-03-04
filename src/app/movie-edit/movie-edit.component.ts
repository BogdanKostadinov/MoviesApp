import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { SelectItem } from '../shared/components/select-with-search/select-with-search.component';
import { Movie, MovieToEdit } from '../shared/models/movie.model';
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
  categoryCtrl = new FormControl<string[]>([], Validators.required);
  categoryItems: SelectItem[] = [];
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

    this.categoryService.getCategories().subscribe((categories) => {
      this.categoryItems = categories.map((category) => ({
        id: category.id,
        label: category.name,
      }));

      const initialCategoryIds =
        this.data.movie?.categories?.map((category) => category.id) || [];
      this.categoryCtrl.setValue(initialCategoryIds);
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
      categoryIds: this.categoryCtrl,
    });
  }
  saveMovie(action: string): void {
    if (!this.validateForm()) return;

    const movieToSave: MovieToEdit = this.form.value;

    if (action === 'add') {
      this.store.dispatch(MovieActions.addMovie({ movie: movieToSave }));
    } else {
      this.store.dispatch(
        MovieActions.updateMovie({
          id: this.data.movie!.id,
          movie: {
            ...this.data.movie,
            ...movieToSave,
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
