import express, { Router } from "express";
import { listCategories } from "../controllers/categories.controller.js";

const router = express.Router();

router.get("/categories", listCategories);

export default router;