import { useCallback, useEffect, useState } from "react";

import { getMovies } from "../../../services/getMovies";
import { getErrorMessage } from "../../../utils/getErrorMessage";

import type { MoviesState } from "./types";

const useMoviesList = ({
  page,
  size,
  year,
  winner,
}: {
  page: number;
  size: number;
  year?: number;
  winner?: boolean;
}) => {
  const [state, setState] = useState<MoviesState>({
    movies: [],
    totalPages: 0,
    loading: true,
    error: null,
  });

  const load = useCallback(async () => {
    try {
      const { content, totalPages } = await getMovies({ page, size, year, winner });
      setState((prev) => ({ ...prev, movies: content, loading: false, totalPages }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: getErrorMessage(error, "Erro ao carregar filmes"),
        loading: false,
      }));
    }
  }, [page, size, year, winner]);

  useEffect(() => {
    load();
  }, [load]);

  return state;
};

export default useMoviesList;
