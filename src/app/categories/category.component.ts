import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @Output() applyChipsEvent = new EventEmitter<Category[]>();
  categories$: Observable<Category[]>;
  selectedCategories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
  ) {
    this.categories$ = this.categoryService.getCategories();
  }

  selectChip(event: MatChipSelectionChange, category: Category): void {
    category.selected = event.selected;
    if (event.selected) {
      this.selectedCategories = [...this.selectedCategories, category];
    } else {
      this.selectedCategories = this.selectedCategories.filter(
        (cat) => cat.id !== category.id,
      );
    }
    this.applyChipsEvent.emit(this.selectedCategories);
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe();
  }
}
