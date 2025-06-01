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
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MovieComponent } from './movie/movie.component';
import { SeachBarComponent } from './shared/components/search-bar/seach-bar.component';
import { SelectWithSearchComponent } from './shared/components/select-with-search/select-with-search.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MaterialModule } from './shared/modules/material.module';
import { reducers } from './store/app.state';
import { CategoryEffects } from './store/effects/category.effects';
import { MovieEffects } from './store/effects/movie.effects';
import { LoginPageComponent } from './login-page/login-page.component';

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
    LoginPageComponent,
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
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([MovieEffects, CategoryEffects]),
  ],
  exports: [MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
