import {
  insertCapturedPokemon,
  getAllCapturedPokemons,
  getCapturedPokemonById,
  updateCapturedPokemon,
} from "../repositories/capturedPokemonRepository.js";

export const list = (req, res) => {
  try {
    const pokemons = getAllCapturedPokemons();
    res.render("pokemons", {
      pokemons: pokemons,
      title: "Pokédex",
      captured: true,
    });
    // res.status(200).json(pokemons);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const capture = (req, res) => {
  const pokemon = req.body;
  try {
    insertCapturedPokemon(pokemon);
    res.status(200).json({ message: "Pokemon captured!", pokemon });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const getCapturedPokemonId = (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = getCapturedPokemonById(id);
    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    res.status(200).json(pokemon);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};

export const evolve = (req, res) => {
  const id = req.params.id;
  try {
    const pokemon = getCapturedPokemonById(id);
    if (!pokemon) {
      return res.status(404).json({ error: "Pokemon not found" });
    }
    const evolvedName = `Evolved ${pokemon.name}`;
    const evolvedCp = pokemon.cp + 10;
    updateCapturedPokemon(id, evolvedName, evolvedCp);
    const updated = getCapturedPokemonById(id);
    res.status(200).json({
      message: `Pokemon ${updated.name} has evolved!`,
      pokemon: updated,
    });
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
