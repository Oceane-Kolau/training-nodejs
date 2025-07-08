import { validatePokemon } from "../schema.js";
import { readFile } from "node:fs/promises";
import process from "node:process";

export const getAllPokemons = async () => {
  const filePath = new URL(process.env.DB_PATH, import.meta.url);
  const contents = await readFile(filePath, { encoding: "utf8" });
  return validatePokemon(JSON.parse(contents)) ? JSON.parse(contents) : [];
};
