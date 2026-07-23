import type { Movie } from "../types/movie";
import api from "./api";

interface MoviesPageResponse {
  content: Movie[];
  totalPages: number;
}

export async function getMovies(_params: {
  page?: number;
  size?: number;
  winner?: boolean;
  year?: number;
}): Promise<MoviesPageResponse> {
  const { data } = await api.get("/movies", { params: _params });
  return data;
}
