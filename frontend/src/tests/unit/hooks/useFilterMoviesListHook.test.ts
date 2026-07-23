import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import useFilterMoviesList from "../../../containers/ListMovies/hooks/useFilterMoviesListHook";

describe("useFilterMoviesList", () => {
  it("starts with page 0 and empty filters", () => {
    const { result } = renderHook(() => useFilterMoviesList());

    expect(result.current.state).toEqual({ page: "0", size: 15, year: "", winner: "" });
  });

  it("updates the given key and resets page to 0", () => {
    const { result } = renderHook(() => useFilterMoviesList());

    act(() => {
      result.current.onChange("3", "page");
    });
    expect(result.current.state.page).toBe("3");

    act(() => {
      result.current.onChange("2020", "year");
    });
    expect(result.current.state.year).toBe("2020");
    expect(result.current.state.page).toBe("0");
  });

  it("clearFilters resets state back to the initial values", () => {
    const { result } = renderHook(() => useFilterMoviesList());

    act(() => {
      result.current.onChange("2020", "year");
      result.current.onChange("true", "winner");
    });

    act(() => {
      result.current.clearFilters();
    });

    expect(result.current.state).toEqual({ page: "0", size: 15, year: "", winner: "" });
  });
});
