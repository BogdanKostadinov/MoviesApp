import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieEditComponent } from '../../../movie-edit/movie-edit.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  constructor(private dialog: MatDialog) {}

  openAddMovieDialog(): void {
    const dialogRef = this.dialog.open(MovieEditComponent, {
      width: '400px',
      data: { action: 'add' },
    });
    dialogRef.afterClosed().subscribe();
  }
}
