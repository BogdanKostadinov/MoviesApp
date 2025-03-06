import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { Category } from '../shared/models/category.model';
import * as CategoryActions from '../store/actions/category.actions';
import { AppState } from '../store/app.state';
import {
  selectAllCategories,
  selectLastUpdated,
} from '../store/selectors/category.selectors';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @Output() applyChipsEvent = new EventEmitter<Category[]>();
  selectedCategories: Category[] = [];

  categories$: Observable<Category[]>;
  lastUpdated$: Observable<string | null>;

  constructor(
    private store: Store<AppState>,
    private dialog: MatDialog,
  ) {
    this.categories$ = this.store.select(selectAllCategories);
    this.lastUpdated$ = this.store.select(selectLastUpdated);
    this.store.dispatch(CategoryActions.getCategories());
  }

  selectChip(event: MatChipSelectionChange, category: Category): void {
    const updatedCategory = { ...category, selected: event.selected };
    if (event.selected) {
      this.selectedCategories = [...this.selectedCategories, updatedCategory];
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
  deleteCategory(category: Category): void {
    this.store.dispatch(CategoryActions.deleteCategory({ id: category.id }));
  }
}
