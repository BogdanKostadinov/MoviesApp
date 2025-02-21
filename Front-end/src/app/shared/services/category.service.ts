import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesUrl = 'assets/mock-data/categories.json'; // Path to JSON file

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<{ category: Category[] }>(this.categoriesUrl)
      .pipe(map((response) => response.category));
  }
}
