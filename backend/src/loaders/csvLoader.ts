import { insertMovie } from "../repositories/movieRepository";

function splitMultiValue(value: string): string[] {
  return value
    .split(/\s*,?\s*and\s+|\s*,\s*/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function loadMoviesFromCsv(csvContent: string): void {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [, ...rows] = lines;

  for (const line of rows) {
    const [year, title, studios, producers, winner] = line.split(";");
    const parsedStudios = splitMultiValue(studios);
    const parsedWinner = winner?.trim().toLowerCase() === "yes";
    const producersList = splitMultiValue(producers);

    for (const producer of producersList) {
      insertMovie({
        year: Number(year),
        title: title.trim(),
        studios: parsedStudios,
        producer,
        winner: parsedWinner,
      });
    }
  }
}
