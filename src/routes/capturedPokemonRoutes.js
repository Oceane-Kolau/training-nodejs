import express from "express";
import {
  capture,
  list,
  evolve,
} from "../controllers/capturedPokemonController.js";

const router = express.Router();

router.post("/capture", capture);
router.get("/", list);
router.post("/:id/evolve", evolve);

export default router;
