import { Category } from './category.model';

export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  categories: Category[];
  dateCreated: string;
  lastModified: string;
}

export interface MovieToEdit
  extends Omit<Movie, 'id' | 'dateCreated' | 'lastModified'> {
  categoryIds: string[];
}
