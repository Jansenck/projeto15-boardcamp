import express, {json} from "express";
import cors from "cors";
import dotenv from "dotenv";

import categoriesRouter from "./routes/categories.route.js";

const app = express();
app.use(json());
app.use(cors());

app.use(categoriesRouter);

app.listen(4000, 
    console.log("Server running on port 4000.")
);

