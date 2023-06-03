import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const menusRouter = express.Router();

menusRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  const menus = menusResult.rows;
  res.send({ menus });
});

menusRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, description, price, assetUrl } = req.body;
  const isValid = name && description && price && assetUrl;
  if (!isValid) return res.sendStatus(400);
  await db.query(
    "insert into menus (name, description, price, asset_url) values ($1, $2, $3, $4)",
    [name, description, price, assetUrl]
  );
  res.sendStatus(200);
});

export default menusRouter;
