import express from "express";
import { addGame } from "../controllers/games.controller.js";

const router = express.Router();

router.use("/games", addGame);

export default router;