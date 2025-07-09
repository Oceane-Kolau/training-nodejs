import { validatePokemon } from "../schema.js";
import { readFile } from "node:fs/promises";
import process from "node:process";
import db from "../db.js";

// Function to get all pokemons from the JSON file
// Has been replaced by a database query in the repository
// using JSONStream for streaming large JSON files
// export const getAllPokemons = async () => {
//   const filePath = new URL(
//     process.env.DB_PATH,
//     import.meta.url
//   );
//   const contents = await readFile(filePath, { encoding: "utf8" });
//   return validatePokemon(JSON.parse(contents)) ? JSON.parse(contents) : [];
// };

export const getAllPokemons = () => {
  return db.prepare("SELECT * FROM pokemons").all();
};