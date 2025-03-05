import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './categories/category.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';
import { SeachBarComponent } from './shared/components/search-bar/seach-bar.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MaterialModule } from './shared/modules/material.module';
import { reducers } from './store/app.state';
import { MovieEffects } from './store/effects/movie.effects';
import { movieFeatureKey, moviesReducer } from './store/reducers/movie.reducer';
import { SelectWithSearchComponent } from './shared/components/select-with-search/select-with-search.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ToolbarComponent,
    MovieEditComponent,
    CategoryComponent,
    SeachBarComponent,
    SelectWithSearchComponent,
    CategoryEditComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    StoreModule.forFeature(movieFeatureKey, moviesReducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MovieEffects]),
  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
