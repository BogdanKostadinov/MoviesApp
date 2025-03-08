import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ValidationHelper } from '../shared/helpers/validation';
import { CategoryToEdit } from '../shared/models/category.model';
import * as CategoryActions from '../store/actions/category.actions';
import { AppState } from '../store/app.state';
import { selectAllCategories } from '../store/selectors/category.selectors';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent implements OnInit {
  categoryNames: string[] = [];
  categoryNameCtrl = new FormControl<string>('');

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAllCategories)
      .pipe(take(1))
      .subscribe((categories) => {
        this.categoryNames = categories.map((c) => c.name.toLowerCase());
        this.categoryNameCtrl.setValidators([
          Validators.required,
          ValidationHelper.noWhitespaceValidator(),
          ValidationHelper.nameExistsValidator(this.categoryNames),
        ]);
      });
  }

  saveCategory(): void {
    ValidationHelper.trimFormControlValue(this.categoryNameCtrl);
    if (ValidationHelper.validateControl(this.categoryNameCtrl)) {
      const categoryToEdit: CategoryToEdit = {
        name: this.categoryNameCtrl.value as string,
      };
      this.store.dispatch(
        CategoryActions.createCategory({ category: categoryToEdit }),
      );
      this.dialogRef.close();
    }
  }

  showError(...errors: string[]): boolean {
    return ValidationHelper.showErrorForControl(
      this.categoryNameCtrl,
      ...errors,
    );
  }

  navigateBack(): void {
    this.dialogRef.close();
  }
}
