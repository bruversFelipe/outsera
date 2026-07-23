import { insertMovie } from "../repositories/movieRepository";

function splitMultiValue(value: string): string[] {
  return value
    .split(/\s*,\s*|\s+and\s+/i)
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
}

export function loadMoviesFromCsv(csvContent: string): void {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const [, ...rows] = lines;

  for (const line of rows) {
    const [year, title, studios, producers, winner] = line.split(";");

    insertMovie({
      year: Number(year),
      title: title.trim(),
      studios: splitMultiValue(studios),
      producers: splitMultiValue(producers),
      winner: winner?.trim().toLowerCase() === "yes",
    });
  }
}
