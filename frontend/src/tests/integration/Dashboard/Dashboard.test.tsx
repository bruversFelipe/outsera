import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import Dashboard from "../../../containers/Dashboard";
import api from "../../../services/api";
import { renderWithTheme } from "../../testUtils";

vi.mock("../../../services/api", () => {
  const mockedApi = { get: vi.fn() };
  return { default: mockedApi, api: mockedApi };
});

const apiGetMock = vi.mocked(api.get);

function mockAllEndpoints() {
  apiGetMock.mockImplementation((url: string) => {
    if (url === "/movies/yearsWithMultipleWinners") {
      return Promise.resolve({ data: { years: [{ year: 1986, winnerCount: 2 }] } });
    }
    if (url === "/movies/studiosWithWinCount") {
      return Promise.resolve({ data: { studios: [{ name: "Columbia Pictures", winCount: 7 }] } });
    }
    if (url === "/movies/maxMinWinIntervalForProducers") {
      return Promise.resolve({
        data: {
          min: [{ producer: "Joel Silver", interval: 1, previousWin: 1990, followingWin: 1991 }],
          max: [
            { producer: "Matthew Vaughn", interval: 13, previousWin: 2002, followingWin: 2015 },
          ],
        },
      });
    }
    if (url === "/movies/winnersByYear") {
      return Promise.resolve({
        data: [{ id: 1, year: 1991, title: "Movie X", studios: [], producers: [], winner: true }],
      });
    }
    return Promise.reject(new Error(`unhandled url: ${url}`));
  });
}

afterEach(() => {
  vi.resetAllMocks();
});

describe("Dashboard (integration)", () => {
  it("renders all four cards with data fetched through the real service layer", async () => {
    mockAllEndpoints();

    renderWithTheme(<Dashboard />);

    expect(await screen.findByText("1986")).toBeInTheDocument();
    expect(screen.getByText("Columbia Pictures")).toBeInTheDocument();
    expect(screen.getByText("Joel Silver")).toBeInTheDocument();
    expect(screen.getByText("Matthew Vaughn")).toBeInTheDocument();
  });

  it("searching by year calls getWinnersByYear and renders the result", async () => {
    mockAllEndpoints();
    const user = userEvent.setup();

    renderWithTheme(<Dashboard />);
    await screen.findByText("1986");

    await user.type(screen.getByPlaceholderText("Pesquise por ano"), "1991");
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    await waitFor(() =>
      expect(apiGetMock).toHaveBeenCalledWith("/movies/winnersByYear", {
        params: { year: 1991 },
      }),
    );
    expect(await screen.findByText("Movie X")).toBeInTheDocument();
  });
});
