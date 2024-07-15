import express, { Application } from "express";

import { createTable } from "./models/catModel";
import catRouter from "./routes/catRouter";

const app: Application = express();

createTable();

app.use(express.json());

app.use("/", catRouter);

export default app;
