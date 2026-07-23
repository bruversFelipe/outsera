import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { theme } from "../theme";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn() },
}));

vi.mocked(api.get).mockResolvedValue({ data: { years: [], studios: [], min: [], max: [] } });

describe("App", () => {
  it("renders the main menu", async () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>,
    );

    const nav = screen.getByRole("navigation");
    expect(within(nav).getByText("Painel")).toBeInTheDocument();
    expect(within(nav).getByText("Listagem de Filmes")).toBeInTheDocument();

    await screen.findByRole("heading", { name: "Dashboard" });
  });
});
