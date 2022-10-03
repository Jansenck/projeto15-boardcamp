import express from "express";
import { addRentals } from "../controllers/rentals.controller.js";

const router = express.Router();

router.post("/rentals", addRentals);

export default router;