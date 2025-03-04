import { Category } from './category.model';

export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  categories: Category[];
}

export interface MovieToEdit extends Omit<Movie, 'id'> {
  categoryIds: string[];
}