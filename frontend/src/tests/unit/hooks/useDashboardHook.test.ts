import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import useDashboardHook from "../../../containers/Dashboard/useDashboardHook";
import { getMaxMinWinIntervalForProducers } from "../../../services/getMaxMinWinIntervalForProducers";
import { getYearsWithMultipleWinners } from "../../../services/getYearsWithMultipleWinners";
import { getStudiosWithWinCount } from "../../../services/getStudiosWithWinCount";
import { getWinnersByYear } from "../../../services/getWinnersByYear";

vi.mock("../../../services/getMaxMinWinIntervalForProducers");
vi.mock("../../../services/getYearsWithMultipleWinners");
vi.mock("../../../services/getStudiosWithWinCount");
vi.mock("../../../services/getWinnersByYear");

const getIntervalMock = vi.mocked(getMaxMinWinIntervalForProducers);
const getYearsMock = vi.mocked(getYearsWithMultipleWinners);
const getStudiosMock = vi.mocked(getStudiosWithWinCount);
const getWinnersMock = vi.mocked(getWinnersByYear);

function mockHappyPath() {
  getYearsMock.mockResolvedValue({ years: [{ year: 1986, winnerCount: 2 }] });
  getStudiosMock.mockResolvedValue({
    studios: [
      { name: "Columbia Pictures", winCount: 7 },
      { name: "Paramount Pictures", winCount: 6 },
      { name: "Warner Bros.", winCount: 5 },
      { name: "MGM", winCount: 3 },
    ],
  });
  getIntervalMock.mockResolvedValue({
    min: [{ producer: "Joel Silver", interval: 1, previousWin: 1990, followingWin: 1991 }],
    max: [{ producer: "Matthew Vaughn", interval: 13, previousWin: 2002, followingWin: 2015 }],
  });
  getWinnersMock.mockResolvedValue([]);
}

afterEach(() => {
  vi.resetAllMocks();
});

describe("useDashboardHook", () => {
  it("loads the three cards on mount and keeps only the top 3 studios", async () => {
    mockHappyPath();

    const { result } = renderHook(() => useDashboardHook());

    await waitFor(() =>
      expect(result.current.state.cardYearsWithMultipleWinners.loading).toBe(false),
    );

    expect(result.current.state.cardYearsWithMultipleWinners.years).toEqual([
      { year: 1986, winnerCount: 2 },
    ]);
    expect(result.current.state.cardStudiosWithWinCount.studios).toEqual([
      { name: "Columbia Pictures", winCount: 7 },
      { name: "Paramount Pictures", winCount: 6 },
      { name: "Warner Bros.", winCount: 5 },
    ]);
    expect(result.current.state.cardIntervalForProducers.min[0].producer).toBe("Joel Silver");
    expect(result.current.state.cardIntervalForProducers.max[0].producer).toBe("Matthew Vaughn");
  });

  it("sets an error only on the card whose request failed", async () => {
    getYearsMock.mockResolvedValue({ years: [] });
    getStudiosMock.mockRejectedValue(new Error("studios endpoint down"));
    getIntervalMock.mockResolvedValue({ min: [], max: [] });
    getWinnersMock.mockResolvedValue([]);

    const { result } = renderHook(() => useDashboardHook());

    await waitFor(() => expect(result.current.state.cardStudiosWithWinCount.error).toBeDefined());

    expect(result.current.state.cardStudiosWithWinCount.error).toBe("studios endpoint down");
    expect(result.current.state.cardYearsWithMultipleWinners.error).toBeUndefined();
  });

  it("loadWinnersByYear fetches winners for the given year on demand", async () => {
    mockHappyPath();
    getWinnersMock.mockResolvedValue([
      { id: 1, year: 1991, title: "Movie", studios: [], producers: [], winner: true },
    ]);

    const { result } = renderHook(() => useDashboardHook());
    await waitFor(() => expect(result.current.state.cardIntervalForProducers.loading).toBe(false));

    await act(async () => {
      await result.current.loadWinnersByYear(1991);
    });

    expect(getWinnersMock).toHaveBeenCalledWith(1991);
    expect(result.current.state.cardWinnersByYear.winners).toHaveLength(1);
  });
});
