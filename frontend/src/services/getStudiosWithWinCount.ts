import type { StudioWinCount } from "../types/studioWinCount";

import api from "./api";

interface StudioWinCountList {
  studios: StudioWinCount[];
}

export async function getStudiosWithWinCount(): Promise<StudioWinCountList> {
  const { data } = await api.get("/movies/studiosWithWinCount");
  return data;
}
