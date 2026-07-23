import { useState } from "react";

import type { FilterMoviesState } from "./types";

const initialState: FilterMoviesState = {
  page: "0",
  size: 15,
  year: "",
  winner: "",
};

const useFilterMoviesList = () => {
  const [state, setState] = useState<FilterMoviesState>({
    ...initialState,
  });

  const onChange = (value: string, key: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
      ...(key !== "page" ? { page: "0" } : {}),
    }));
  };

  const clearFilters = () => {
    setState({ ...initialState });
  };

  return { state, onChange, clearFilters };
};

export default useFilterMoviesList;
