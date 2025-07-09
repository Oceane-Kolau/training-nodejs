
export const deleteCapturedPokemonById = (id) => {
  return db.prepare("DELETE FROM capturedPokemons WHERE id = ?").run(id);
};
import db from "../db.js";

export const insertCapturedPokemon = (pokemon) => {
  db.prepare(
    `INSERT INTO capturedPokemons (name, hp, cp, picture, types) VALUES (?, ?, ?, ?, ?)`
  ).run(
    pokemon.name,
    pokemon.hp,
    pokemon.cp,
    pokemon.picture,
    JSON.stringify(pokemon.types)
  );
};

export const getAllCapturedPokemons = () => {
  return db.prepare("SELECT * FROM capturedPokemons").all();
};

export const getCapturedPokemonById = (id) => {
  return db.prepare("SELECT * FROM capturedPokemons WHERE id = ?").get(id);
};

export const updateCapturedPokemon = (id, name, cp) => {
  db.prepare("UPDATE capturedPokemons SET name = ?, cp = ? WHERE id = ?").run(
    name,
    cp,
    id
  );
};
