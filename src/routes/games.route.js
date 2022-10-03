import express from "express";
import { addGame, listGames } from "../controllers/games.controller.js";
import gamesValidation from "../middlewares/games.middleware.js"

const router = express.Router();

router.get("/games", listGames);
router.post("/games", gamesValidation, addGame);

export default router;