import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [
  {
    path: 'movies/:id',
    component: MovieEditComponent,
  },
  {
    path: 'movies',
    component: MovieComponent,
  },
  { path: '**', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
