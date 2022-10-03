import express, {json} from "express";
import cors from "cors";

import categoriesRouter from "./routes/categories.route.js";
import gamesRouter from "./routes/games.route.js";
import customersRouter from "./routes/customers.route.js";

const app = express();
app.use(json());
app.use(cors());

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(customersRouter);

app.listen(4000, 
    console.log("Server running on port 4000.")
);

