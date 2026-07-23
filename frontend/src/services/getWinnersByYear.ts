import type { WinnerByYear } from "../types/winnerByYear";

import api from "./api";

export async function getWinnersByYear(_year: number): Promise<WinnerByYear[]> {
  const { data } = await api.get("/movies/winnersByYear", { params: { year: _year } });
  return data;
}
