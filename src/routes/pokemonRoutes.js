import express from "express";
import { getAll, capture } from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/", getAll);
router.post("/:id/capture", capture);

export default router;
