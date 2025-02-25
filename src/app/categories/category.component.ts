import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipSelectionChange } from '@angular/material/chips';
import { Category } from '../shared/models/category.model';
import { CategoryService } from '../shared/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  @Output() applyChipsEvent = new EventEmitter<Category[]>();
  categories: Category[] = [];
  constructor(private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  selectChip(event: MatChipSelectionChange, category: Category): void {
    category.selected = event.selected;
    this.categories = this.categories.map((cat) =>
      cat.name === category.name ? category : cat,
    );
    this.applyChipsEvent.emit(this.categories);
  }
}
