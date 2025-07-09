import express from "express";
import {
  getAll,
  capture,
  getPokemonById,
} from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/:id/capture", capture);
router.get("/:id", getPokemonById);

export default router;
