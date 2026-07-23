import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../src/server";
import { db } from "../src/config/database";

describe("erros HTTP", () => {
  it("retorna 404 para uma rota que não existe", async () => {
    const response = await request(app).get("/false-route");

    expect(response.status).toBe(404);
  });

  it("retorna 404 para o método errado numa rota que existe", async () => {
    const response = await request(app).post("/producers/interval");

    expect(response.status).toBe(404);
  });

  it("retorna 500 em vez de derrubar o processo quando o banco está indisponível", async () => {
    db.close();

    const response = await request(app).get("/producers/interval");

    expect(response.status).toBe(500);
  });
});
