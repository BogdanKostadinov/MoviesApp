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
import { MovieEffects } from './store/effects/movie.effects';
import { movieFeatureKey, moviesReducer } from './store/reducers/movie.reducer';
import { reducers } from './store/app.state';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    ToolbarComponent,
    MovieEditComponent,
    CategoryComponent,
    SeachBarComponent,
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
    EffectsModule.forRoot([]), // Add this line
    EffectsModule.forFeature([MovieEffects]),
  ],
  exports: [MaterialModule],
  providers: [
    // provideStore(),
    // provideState({ name: 'counter', reducer: counterReducer }),
    // provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
