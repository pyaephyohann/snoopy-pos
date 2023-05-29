import express, { Request, Response } from "express";
import { db } from "../db/db";

export const menuCategoriesRouter = express.Router();

menuCategoriesRouter.get("/", async (req: Request, res: Response) => {
  const menuCategoriesResult = await db.query("select * from menu_categories");
  const menuCategories = menuCategoriesResult.rows;
  res.send({ menuCategories });
});
