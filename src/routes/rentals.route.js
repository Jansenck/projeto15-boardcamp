import express from "express";
import { addRentals,listRentals } from "../controllers/rentals.controller.js";

const router = express.Router();

router.post("/rentals", addRentals);
router.get("/rentals", listRentals);

export default router;