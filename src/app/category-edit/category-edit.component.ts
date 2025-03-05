import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryToEdit } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent {
  categoryNameCtrl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private categoryService: CategoryService,
  ) {}

  saveCategory(): void {
    if (this.categoryNameCtrl.invalid) return;
    const categoryToEdit: CategoryToEdit = {
      name: this.categoryNameCtrl.value as string,
    };

    this.categoryService
      .addCategory(categoryToEdit)
      .subscribe(() => this.dialogRef.close());
  }
  showError(control: FormControl, ...errors: string[]): boolean {
    if (!control) return false;

    return errors.some((error) => control.hasError(error));
  }
  navigateBack(): void {
    this.dialogRef.close();
  }
}
