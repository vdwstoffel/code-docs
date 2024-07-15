import express, { Application, Request, Response } from "express";

import userRouter from "./routes/userRoutes";

const app: Application = express();
app.use(express.json());

app.use("/", userRouter)

app.listen(3000);
