import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-seach-bar',
  templateUrl: './seach-bar.component.html',
  styleUrl: './seach-bar.component.scss',
})
export class SeachBarComponent {
  @Input() placeholder = 'Search...';
  @Output() searchValueChange = new EventEmitter<string>();
  searchValue = '';

  searchMovies(): void {
    this.searchValueChange.emit(this.searchValue);
  }

  clearSearch(): void {
    this.searchValue = '';
    this.searchValueChange.emit(this.searchValue);
  }
}
