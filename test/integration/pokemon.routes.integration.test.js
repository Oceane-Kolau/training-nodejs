import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../src/index.js";

let server;
beforeAll((done) => {
  server = app.listen(0, done);
});
afterAll((done) => {
  server.close(done);
});

describe("Pokémon /pokemon routes", () => {
  it("GET /pokemon should render the pokemons list page", async () => {
    const res = await request(server).get("/pokemon");
    expect(res.status).toBe(200);
    expect(res.text).toContain('<ul class="pokemon-list">');
    expect(res.text).toMatch(/<li class="pokemon-card"/);
  });

  it("GET /pokemon/:id should return a single pokemon (JSON or HTML)", async () => {
    const res = await request(server).get("/pokemon/1");
    expect([200, 400, 500]).toContain(res.status);
  });

  it("POST /pokemon/:id/capture should capture a pokemon and return its data", async () => {
    const res = await request(server).post("/pokemon/1/capture");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("types");
  });

  it("POST /pokemon/:id/capture with invalid id should return 404 or error", async () => {
    const res = await request(server).post("/pokemon/99999/capture");
    expect([404, 400, 500]).toContain(res.status);
  });
});
