import express, { Application, Request, Response } from "express";

import { createToken, verifyToken } from "./jwt";

const app: Application = express();
app.use(express.json());

app.get("/getToken", (req: Request, res: Response) => {
  const token = createToken(597);
  res.status(200).json({ status: "success", token: token });
});

app.post("/login", (req: Request, res: Response) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ status: "fail", message: "Token not provided" });
  }

  try {
    const result = verifyToken(token); // { userId: 597, iat: 1721031831, exp: 1721636631 }
    res.status(200).json({ status: "success", message: "logged in" });
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
});

app.listen(3000);
