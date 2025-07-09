import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index.js';

let server;
beforeAll((done) => {
  server = app.listen(0, done);
});
afterAll((done) => {
  server.close(done);
});

describe('Pokémon /capturedPokemon routes', () => {
  it('GET /capturedPokemon should render the captured pokemons page', async () => {
    const res = await request(server).get('/capturedPokemon');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Captured');
  });

  it('POST /pokemon/:id/capture then GET /capturedPokemon should show the captured pokemon', async () => {
    await request(server).post('/pokemon/2/capture');
    const res = await request(server).get('/capturedPokemon');
    expect(res.status).toBe(200);
    expect(res.text).toMatch(/Pikachu|Bulbizarre|Salamèche|Carapuce/);
  });
});
