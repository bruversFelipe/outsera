import type { ProducerInterval } from "../types/producerInterval";

import api from "./api";

interface ProducerIntervalResponse {
  min: ProducerInterval[];
  max: ProducerInterval[];
}

export async function getMaxMinWinIntervalForProducers(): Promise<ProducerIntervalResponse> {
  const { data } = await api.get("/movies/maxMinWinIntervalForProducers");
  return data;
}
