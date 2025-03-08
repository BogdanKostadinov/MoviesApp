import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CategoryToEdit } from '../shared/models/category.model';
import * as CategoryActions from '../store/actions/category.actions';
import { ValidationHelper } from '../shared/helpers/validation';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent {
  categoryNameCtrl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private store: Store,
  ) {}

  saveCategory(): void {
    if (this.categoryNameCtrl.invalid) return;
    const categoryToEdit: CategoryToEdit = {
      name: this.categoryNameCtrl.value as string,
    };

    this.store.dispatch(
      CategoryActions.createCategory({ category: categoryToEdit }),
    );

    this.dialogRef.close();
  }
  showError(...errors: string[]): boolean {
    return ValidationHelper.showErrorForControl(this.categoryNameCtrl, ...errors);
  }
  navigateBack(): void {
    this.dialogRef.close();
  }
}
