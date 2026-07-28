import { db } from "../config/database";

import type { Movie } from "../types/movie";

interface MovieRow {
  year: number;
  title: string;
  studios: string;
  producer: string;
  winner: number;
}

const insertStatement = db.prepare(
  `INSERT INTO movies (year, title, studios, producer, winner)
   VALUES (@year, @title, @studios, @producer, @winner)`,
);

export function insertMovie(movie: Movie): void {
  insertStatement.run({
    year: movie.year,
    title: movie.title,
    studios: JSON.stringify(movie.studios),
    producer: movie.producer,
    winner: movie.winner ? 1 : 0,
  });
}

function toMovie(row: MovieRow): Movie {
  return {
    year: row.year,
    title: row.title,
    studios: JSON.parse(row.studios) as string[],
    producer: row.producer,
    winner: row.winner === 1,
  };
}

export function findWinningMovieCreditsSortedByYear(): Movie[] {
  const rows = db
    .prepare(
      "SELECT year, title, studios, producer, winner FROM movies WHERE winner = 1 ORDER BY year ASC",
    )
    .all() as MovieRow[];

  return rows.map(toMovie);
}
