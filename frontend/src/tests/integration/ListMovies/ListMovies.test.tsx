import { screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import ListMovies from "../../../containers/ListMovies";
import api from "../../../services/api";
import { renderWithTheme } from "../../testUtils";

vi.mock("../../../services/api", () => ({
  default: { get: vi.fn() },
}));

const apiGetMock = vi.mocked(api.get);

afterEach(() => {
  vi.resetAllMocks();
});

describe("ListMovies (integration)", () => {
  it("renders movies fetched through the real service layer", async () => {
    apiGetMock.mockResolvedValueOnce({
      data: {
        content: [
          {
            id: 1,
            year: 2020,
            title: "Movie One",
            studios: ["Studio A"],
            producers: ["Producer A"],
            winner: true,
          },
        ],
        totalPages: 2,
      },
    });

    renderWithTheme(<ListMovies />);

    expect(await screen.findByText("Movie One")).toBeInTheDocument();
    expect(apiGetMock).toHaveBeenCalledWith("/movies", {
      params: { page: 0, size: 15, year: undefined, winner: undefined },
    });
  });

  it("resets the page and refetches when the year filter changes", async () => {
    apiGetMock.mockResolvedValue({ data: { content: [], totalPages: 1 } });
    const user = userEvent.setup();

    renderWithTheme(<ListMovies />);
    await waitFor(() => expect(apiGetMock).toHaveBeenCalledTimes(1));

    await user.type(screen.getByPlaceholderText("Filtre por ano"), "2020");

    await waitFor(() =>
      expect(apiGetMock).toHaveBeenLastCalledWith("/movies", {
        params: { page: 0, size: 15, year: 2020, winner: undefined },
      }),
    );
  });

  it('"Limpar filtros" clears the year input and refetches without it', async () => {
    apiGetMock.mockResolvedValue({ data: { content: [], totalPages: 1 } });
    const user = userEvent.setup();

    renderWithTheme(<ListMovies />);
    await waitFor(() => expect(apiGetMock).toHaveBeenCalledTimes(1));

    const yearInput = screen.getByPlaceholderText("Filtre por ano");
    await user.type(yearInput, "2020");
    await waitFor(() =>
      expect(apiGetMock).toHaveBeenLastCalledWith(
        "/movies",
        expect.objectContaining({ params: expect.objectContaining({ year: 2020 }) }),
      ),
    );

    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));

    await waitFor(() =>
      expect(apiGetMock).toHaveBeenLastCalledWith("/movies", {
        params: { page: 0, size: 15, year: undefined, winner: undefined },
      }),
    );
    expect(yearInput).toHaveValue("");
  });

  it("shows the empty-state row when the API returns no movies", async () => {
    apiGetMock.mockResolvedValueOnce({ data: { content: [], totalPages: 1 } });

    renderWithTheme(<ListMovies />);

    const table = await screen.findByRole("table");
    expect(within(table).getByText("Nenhum registro encontrado")).toBeInTheDocument();
  });
});
