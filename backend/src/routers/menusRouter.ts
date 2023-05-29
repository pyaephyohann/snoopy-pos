import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const menusRouter = express.Router();

menusRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  const menus = menusResult.rows;
  res.send({ menus });
});

export default menusRouter;
