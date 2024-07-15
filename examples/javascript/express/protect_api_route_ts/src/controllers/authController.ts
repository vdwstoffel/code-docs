import { NextFunction, Request, Response } from "express";
import { verifyToken, createToken } from "../jwt";

export const getToken = async (req: Request, res: Response) => {
  const token = createToken(597);
  res.status(200).json({ status: "success", token: token });
};

export const secret = async (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Secret Page" });
};

export const loginRequired = async (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization;
  token = token?.split(" ")[1];

  if (!token) {
    return res.status(400).json({ status: "fail", message: "Token not provided" });
  }

  try {
    verifyToken(token); // { userId: 597, iat: 1721031831, exp: 1721636631 }
    next();
  } catch (err) {
    return res.status(401).json({ status: "fail", message: "Unauthorized" });
  }
};
