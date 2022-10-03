import express from "express";
import { addGame } from "../controllers/games.controller.js";
import gamesValidation from "../middlewares/games.middleware.js"

const router = express.Router();

router.post("/games", gamesValidation, addGame);

export default router;