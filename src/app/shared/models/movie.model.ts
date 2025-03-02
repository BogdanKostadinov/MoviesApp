export interface Movie {
  id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string[];
}

export interface MovieToAdd extends Omit<Movie, 'id'> {

}
