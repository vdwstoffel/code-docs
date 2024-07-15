import express, { Application } from "express";

import catRouter from "./routes/catRouter";

const app: Application = express();

app.use("/", catRouter);

export default app;
