export interface Category {
  id: string;
  name: string;
  dateCreated: string;
  lastModified: string;
  selected: boolean;
}

export interface CategoryToEdit
  extends Omit<Category, 'id' | 'selected' | 'dateCreated' | 'lastModified'> {}
