import type { Movie } from "../../../types/movie";

export interface FilterMoviesState {
  page: string;
  size: number;
  year?: string | undefined;
  winner?: string | undefined;
}

export interface MoviesState {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  totalPages: number | null;
}
