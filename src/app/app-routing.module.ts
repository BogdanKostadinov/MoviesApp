import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: 'categories/:id',
    component: CategoryEditComponent,
  },
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
