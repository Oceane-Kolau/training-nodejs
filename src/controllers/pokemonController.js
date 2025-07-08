import { getAllPokemons } from "../repositories/pokemonRepository.js";

export const getAll = async (req, res) => {
  try {
    const pokemonList = await getAllPokemons();
    if (pokemonList && pokemonList.length > 0) {
        console.log(pokemonList); // Debugging line to check the fetched data
      res.render("pokemons", { pokemons: pokemonList, title: "Pokédex" });
      // res.status(200).json(pokemonList);
    } else {
      res.status(404).json({ error: "No data found" });
    }
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
    req.insertCapturedPokemon(newPokemon); // Middleware will inject this
    res.status(201).json(newPokemon);
  } catch (err) {
    res.status(500).json({ error: "Database error", details: err.message });
  }
};
