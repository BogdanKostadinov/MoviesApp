import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-seach-bar',
  templateUrl: './seach-bar.component.html',
  styleUrl: './seach-bar.component.scss',
})
export class SeachBarComponent {
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
