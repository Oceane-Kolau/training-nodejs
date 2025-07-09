import { getAllPokemons } from "../repositories/pokemonRepository.js";
import { insertCapturedPokemon } from "../repositories/capturedPokemonRepository.js";

export const getAll = async (req, res) => {
  try {
    const pokemonList = await getAllPokemons();
    if (pokemonList && pokemonList.length > 0) {
      res.render("pokemons", {
        pokemons: pokemonList,
        title: "Pokédex",
        captured: false,
      });
      // res.status(200).json(pokemonList);
    } else {
      res.status(404).json({ error: "No data found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const getPokemonById = async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemonList = await getAllPokemons();
    const pokemon = pokemonList.find(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );
    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const capture = async (req, res) => {
  const pokemonId = req.params.id;
  try {
    const pokemonList = await getAllPokemons();
    const newPokemon = pokemonList.find(
      (pokemon) => pokemon.id === parseInt(pokemonId)
    );
    if (!newPokemon) {
      return res.status(400).json({ error: "Invalid Pokemon data" });
    }
    insertCapturedPokemon(newPokemon); // Middleware will inject this
    res.status(200).json(newPokemon);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
