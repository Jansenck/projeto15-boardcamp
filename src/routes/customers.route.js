import express from "express";
import { listCustomers, addCustomer, updateCustomer } from "../controllers/customers.controller.js";
import { validateCustomers, validateUpdatingCustomers } from "../middlewares/customers.middleware.js"

const router = express.Router();

router.get("/customers", listCustomers);
router.post("/customers", validateCustomers, addCustomer);
router.put("/customers/:id", validateUpdatingCustomers, updateCustomer);

export default router;