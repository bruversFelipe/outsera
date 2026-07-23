import { db } from "../config/database";

import type { Movie } from "../types/movie";

interface MovieRow {
  year: number;
  title: string;
  studios: string;
  producers: string;
  winner: number;
}

const insertStatement = db.prepare(
  `INSERT INTO movies (year, title, studios, producers, winner)
   VALUES (@year, @title, @studios, @producers, @winner)`,
);

export function insertMovie(movie: Movie): void {
  insertStatement.run({
    year: movie.year,
    title: movie.title,
    studios: JSON.stringify(movie.studios),
    producers: JSON.stringify(movie.producers),
    winner: movie.winner ? 1 : 0,
  });
}

function toMovie(row: MovieRow): Movie {
  return {
    year: row.year,
    title: row.title,
    studios: JSON.parse(row.studios) as string[],
    producers: JSON.parse(row.producers) as string[],
    winner: row.winner === 1,
  };
}

export function findAllMovies(): Movie[] {
  const rows = db
    .prepare("SELECT year, title, studios, producers, winner FROM movies")
    .all() as MovieRow[];

  return rows.map(toMovie);
}
