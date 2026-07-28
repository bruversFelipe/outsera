import { findWinningMovieCreditsSortedByYear } from "../../repositories/movieRepository";

import type { Movie } from "../../types/movie";
import type { ProducerInterval, ProducerIntervalResponse } from "./types";

function calculateIntervals(winningCredits: Movie[]): ProducerInterval[] {
  const lastWinYearByProducer = new Map<string, number>();
  const intervals: ProducerInterval[] = [];

  for (const { producer, year } of winningCredits) {
    const previousWin = lastWinYearByProducer.get(producer);

    if (previousWin !== undefined) {
      const interval = year - previousWin;
      intervals.push({ producer, interval, previousWin, followingWin: year });
    }

    lastWinYearByProducer.set(producer, year);
  }

  return intervals;
}

function pickMinAndMax(intervals: ProducerInterval[]): ProducerIntervalResponse {
  let min: ProducerInterval[] = [];
  let max: ProducerInterval[] = [];

  for (const interval of intervals) {
    if (min.length === 0 || interval.interval < min[0].interval) {
      min = [interval];
    } else if (interval.interval === min[0].interval) {
      min.push(interval);
    }

    if (max.length === 0 || interval.interval > max[0].interval) {
      max = [interval];
    } else if (interval.interval === max[0].interval) {
      max.push(interval);
    }
  }

  return { min, max };
}

export function getProducerWinIntervals(): ProducerIntervalResponse {
  const winningCredits = findWinningMovieCreditsSortedByYear();
  const intervals = calculateIntervals(winningCredits);
  const producerWinIntervals = pickMinAndMax(intervals);

  return producerWinIntervals;
}
