import db from "./db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import JSONStream from "JSONStream";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const seedPokemonsFromJSON = async () => {
  return new Promise((resolve, reject) => {
    const pokedexPath = path.join(__dirname, "data", "pokedex.json");
    if (!fs.existsSync(pokedexPath)) return resolve();
    const stream = fs
      .createReadStream(pokedexPath, { encoding: "utf8" })
      .pipe(JSONStream.parse("*"));
    stream.on("data", (pokemon) => {
      // Vérifie si le Pokémon existe déjà (par id ou name)
      const exists = db
        .prepare("SELECT 1 FROM pokemons WHERE id = ?")
        .get(pokemon.id);
      if (!exists) {
        db.prepare(
          `INSERT INTO pokemons (id, name, hp, cp, picture, types, created) VALUES (?, ?, ?, ?, ?, ?, ?)`
        ).run(
          pokemon.id,
          pokemon.name,
          pokemon.hp,
          pokemon.cp,
          pokemon.picture,
          JSON.stringify(pokemon.types),
          pokemon.created || new Date().toISOString()
        );
      }
    });
    stream.on("end", resolve);
    stream.on("error", reject);
  });
};
