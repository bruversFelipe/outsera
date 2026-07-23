import { findAllMovies } from "../../repositories/movieRepository";

import type { Movie } from "../../types/movie";
import type { ProducerInterval, ProducerIntervalResponse } from "./types";

function groupWinningYearsByProducer(movies: Movie[]): Map<string, number[]> {
  const winningYearsByProducer = new Map<string, number[]>();

  for (const movie of movies) {
    if (!movie.winner) {
      continue;
    }

    for (const producer of movie.producers) {
      const years = winningYearsByProducer.get(producer) ?? [];
      years.push(movie.year);
      winningYearsByProducer.set(producer, years);
    }
  }

  return winningYearsByProducer;
}

function calculateIntervals(winningYearsByProducer: Map<string, number[]>): ProducerInterval[] {
  const intervals: ProducerInterval[] = [];

  for (const [producer, years] of winningYearsByProducer) {
    const sortedYears = [...years].sort((a, b) => a - b);

    for (let i = 1; i < sortedYears.length; i += 1) {
      intervals.push({
        producer,
        interval: sortedYears[i] - sortedYears[i - 1],
        previousWin: sortedYears[i - 1],
        followingWin: sortedYears[i],
      });
    }
  }

  return intervals;
}

export function getProducerWinIntervals(): ProducerIntervalResponse {
  const movies = findAllMovies();
  const winningYearsByProducer = groupWinningYearsByProducer(movies);
  const intervals = calculateIntervals(winningYearsByProducer);

  const allIntervalValues = intervals.map((item) => item.interval);
  const minInterval = Math.min(...allIntervalValues);
  const maxInterval = Math.max(...allIntervalValues);

  return {
    min: intervals.filter((item) => item.interval === minInterval),
    max: intervals.filter((item) => item.interval === maxInterval),
  };
}
