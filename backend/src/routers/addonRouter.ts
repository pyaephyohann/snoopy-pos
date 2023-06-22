import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

export const addonRouter = express.Router();

addonRouter.put("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;
  const isValid = addonId && req.body.name;
  if (!isValid) return res.sendStatus(400);
  const existingAddons = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const isExist = existingAddons.rows.length > 0;
  if (!isExist) return res.sendStatus(404);
  const name = req.body.name;
  const price = req.body.price || existingAddons.rows[0].price;
  await db.query("update addons set name = $1 , price = $2 where id = $3", [
    name,
    price,
    addonId,
  ]);
  res.sendStatus(200);
});

addonRouter.delete("/:id", checkAuth, async (req: Request, res: Response) => {
  const addonId = req.params.id;
  if (!addonId) return res.sendStatus(400);
  const existingAddons = await db.query("select * from addons where id = $1", [
    addonId,
  ]);
  const isExist = existingAddons.rows.length > 0;
  if (!isExist) return res.sendStatus(404);
  await db.query("update addons set is_archived = true where id = $1", [
    addonId,
  ]);
  res.sendStatus(200);
});
