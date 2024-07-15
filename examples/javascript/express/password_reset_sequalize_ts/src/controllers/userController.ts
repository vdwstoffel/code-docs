import { RequestHandler, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import {
  createNewuser,
  findUser,
  findUserByResetToken,
  updatePassword,
  updatePasswordReset,
} from "../models/userModel";

export const createUser = async (req: Request, res: Response) => {
  await createNewuser({ userName: "John", password: "12345678" });
  res.status(200).json({ status: "success" });
};

export const passwordResetRequest = async (req: Request, res: Response) => {
  const { userName } = req.body;
  const user = await findUser(userName);

  if (!user) {
    res.status(401).json({ status: "fail", message: "User does not exists" });
  }

  const resetToken = uuidv4();
  await updatePasswordReset(userName, resetToken);

  // Generally you would have a email function and send the token as a response
  // Here the token is returned as an exmaple but this is a big security risk

  res.status(200).json({ status: "success", resetToken: resetToken });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { password } = req.body;
  const resetToken: string = req.params.resetToken;

  const user = await findUserByResetToken(resetToken);

  if (!user) {
    return res.status(401).json({ status: "fail", message: "Invalid Token" });
  }

  if (user.passwordResetTokenExpiry === null) {
    return res.status(401).json({ status: "fail", message: "Invalid Request" });
  }

  const currentTime: Date = new Date(Date.now());
  if (currentTime > user.passwordResetTokenExpiry) {
    return res.status(401).json({ status: "fail", message: "Token expired" });
  }

  await updatePassword(user.userName, password);

  res.status(200).json({ status: "success", message: "Password reset successful" });
};
