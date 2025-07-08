
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true, strict: false });

const pokemonSchema = {
  type: "array",
  required: ["id", "name", "hp", "pictures", "cp", "types", "created"],
  additionalProperties: false,
  items: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      hp: { type: "number" },
      cp: { type: "number" },
      pictures: { type: "string" },
      types: {
        type: "array",
        items: {
          type: "string",
        },
      },
      created: {
        type: "string",
      },
    },
  },
};

export const validatePokemon = ajv.compile(pokemonSchema);