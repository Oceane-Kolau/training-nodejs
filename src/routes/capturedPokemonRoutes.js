import express from "express";
import {
  capture,
  list,
  getCapturedPokemonId,
  evolve,
} from "../controllers/capturedPokemonController.js";

const router = express.Router();

router.post("/capture", capture);
router.post("/id", getCapturedPokemonId);
router.get("/", list);
router.post("/:id/evolve", evolve);

export default router;
