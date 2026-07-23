import fs from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/server";
import { loadMoviesFromCsv } from "../src/loaders/csvLoader";

beforeAll(() => {
  const csvPath = path.resolve(__dirname, "../data/Movielist.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  loadMoviesFromCsv(csvContent);
});

describe("GET /health", () => {
  it("returns status ok", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});

describe("GET /producers/interval", () => {
  it("returns the producer with the smallest and the largest interval between consecutive wins", async () => {
    const response = await request(app).get("/producers/interval");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      min: [{ producer: "Joel Silver", interval: 1, previousWin: 1990, followingWin: 1991 }],
      max: [{ producer: "Matthew Vaughn", interval: 13, previousWin: 2002, followingWin: 2015 }],
    });
  });
});
