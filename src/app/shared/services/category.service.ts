import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Category, CategoryToEdit } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = 'https://localhost:44371/categories';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      map((categories) =>
        categories.sort(
          (a, b) =>
            new Date(b.dateCreated).getTime() -
            new Date(a.dateCreated).getTime(),
        ),
      ),
      catchError(this.handleError),
    );
  }

  getCategory(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  createCategory(category: CategoryToEdit): Observable<Category> {
    return this.http
      .post<Category>(this.url, category)
      .pipe(catchError(this.handleError));
  }

  updateCategory(
    id: string,
    updatedCategory: Partial<Category>,
  ): Observable<Category> {
    return this.http
      .put<Category>(`${this.url}/${id}`, updatedCategory)
      .pipe(catchError(this.handleError));
  }

  deleteCategory(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred; please try again later.';

    if (error.status === 404) {
      errorMessage =
        'No movies found. Please check the database or try again later.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`,
      );
    }

    return throwError(() => new Error(errorMessage));
  }
}
