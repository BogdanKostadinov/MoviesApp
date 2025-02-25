import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MaterialModule } from './shared/modules/material.module';
import { CategoryComponent } from './categories/category.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ToolbarComponent,
    MovieEditComponent,
    CategoryComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [MaterialModule],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
