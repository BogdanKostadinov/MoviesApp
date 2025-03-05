export interface Category {
  id: string;
  name: string;
  selected: boolean;
}

export interface CategoryToEdit extends Omit<Category, 'id' | 'selected'> {}
