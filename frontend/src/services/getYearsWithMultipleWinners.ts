import type { YearWithMultipleWinners } from "../types/yearWithMultipleWinners";

import api from "./api";

interface YearWithMultipleWinnersList {
  years: YearWithMultipleWinners[];
}

export async function getYearsWithMultipleWinners(): Promise<YearWithMultipleWinnersList> {
  const { data } = await api.get("/movies/yearsWithMultipleWinners");
  return data;
}
