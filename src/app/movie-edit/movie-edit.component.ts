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
      title: [this.data.movie?.title || '', Validators.required],
      genre: [this.data.movie?.genre || '', Validators.required],
      releaseYear: [this.data.movie?.releaseYear || '', Validators.required],
      director: [this.data.movie?.director || '', Validators.required],
    });
  }
  saveMovie(action: string): void {
    if (this.form.invalid) return;
    const movieToSave: MovieToAdd = this.form.value;
    if (action === 'add') {
      this.store.dispatch(MovieActions.addMovie({ movie: movieToSave }));
      this.dialogRef.close({ success: true, action: this.data.action });
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
      this.dialogRef.close({ success: true, action: this.data.action });
    }
  }

  navigateBack(): void {
    this.dialogRef.close({ success: false });
  }
}
