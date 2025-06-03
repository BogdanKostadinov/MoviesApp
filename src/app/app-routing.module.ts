import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';
import { RegisterPageComponent } from './register-page/register-page.component';

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
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent,
  },
  { path: '**', component: MovieComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
