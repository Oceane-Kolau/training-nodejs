import express from "express";
import {
  capture,
  list,
  getCapturedPokemonId,
  evolve,
} from "../controllers/capturedPokemonController.js";

const router = express.Router();


import { deleteCapturedPokemon } from "../controllers/capturedPokemonController.js";

router.post("/capture", capture);
router.post("/id", getCapturedPokemonId);
router.get("/", list);
router.post("/:id/evolve", evolve);
router.delete("/:id", deleteCapturedPokemon);

export default router;
