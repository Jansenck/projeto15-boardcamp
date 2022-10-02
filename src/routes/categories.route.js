import express, { Router } from "express";
import { listCategories, addCategory } from "../controllers/categories.controller.js";
import categoriesValidation from "../middlewares/categories.middleware.js";

const router = express.Router();

router.get("/categories", listCategories);
router.post("/categories", categoriesValidation, addCategory);

export default router;