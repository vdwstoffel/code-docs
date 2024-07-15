import { Request, Response } from "express";

import { getAllCats, createCat } from "../models/catModel";

export const getCats = async (req: Request, res: Response) => {
  const cats = await getAllCats();
  res.status(200).json({ status: "Success", cats: cats });
};

export const addCat = async (req: Request, res: Response) => {
  const { name } = req.body;

  await createCat(name);

  res.status(200).json({ status: "Success", message: "New cat created" });
};
