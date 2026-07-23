import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useMoviesList from "../../../containers/ListMovies/hooks/useMoviesListHook";
import { getMovies } from "../../../services/getMovies";

vi.mock("../../../services/getMovies");

const getMoviesMock = vi.mocked(getMovies);

afterEach(() => {
  vi.resetAllMocks();
});

describe("useMoviesList", () => {
  it("loads movies on mount and exposes them once resolved", async () => {
    getMoviesMock.mockResolvedValueOnce({
      content: [{ id: 1, year: 2020, title: "Movie", studios: [], producers: [], winner: false }],
      totalPages: 4,
    });

    const { result } = renderHook(() => useMoviesList({ page: 0, size: 15 }));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toHaveLength(1);
    expect(result.current.totalPages).toBe(4);
    expect(result.current.error).toBeNull();
    expect(getMoviesMock).toHaveBeenCalledWith({
      page: 0,
      size: 15,
      year: undefined,
      winner: undefined,
    });
  });

  it("sets an error message when the request fails", async () => {
    getMoviesMock.mockRejectedValueOnce(new Error("network down"));

    const { result } = renderHook(() => useMoviesList({ page: 0, size: 15 }));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("network down");
    expect(result.current.movies).toEqual([]);
  });

  it("refetches when page/year/winner change", async () => {
    getMoviesMock.mockResolvedValue({ content: [], totalPages: 1 });

    const { result, rerender } = renderHook<
      ReturnType<typeof useMoviesList>,
      { page: number; year?: number }
    >(({ page, year }) => useMoviesList({ page, size: 15, year }), {
      initialProps: { page: 0, year: undefined },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(getMoviesMock).toHaveBeenCalledTimes(1);

    rerender({ page: 1, year: 2020 });

    await waitFor(() => expect(getMoviesMock).toHaveBeenCalledTimes(2));
    expect(getMoviesMock).toHaveBeenLastCalledWith({
      page: 1,
      size: 15,
      year: 2020,
      winner: undefined,
    });
  });
});
