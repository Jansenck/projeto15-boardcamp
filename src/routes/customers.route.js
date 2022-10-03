import express from "express";
import { listCustomers, addCustomer } from "../controllers/customers.controller.js";
import validateCustomers from "../middlewares/customers.middleware.js"

const router = express.Router();

router.get("/customers", listCustomers);
router.post("/customers", validateCustomers, addCustomer);

export default router;