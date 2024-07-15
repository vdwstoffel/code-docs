import { Request, Response } from "express";

import { getAllCats, createCat } from "../models/catModel";

export const getCats = async (req: Request, res: Response) => {
  const cats = await getAllCats();
  res.status(200).json({ status: "Success", cats: cats });
};
