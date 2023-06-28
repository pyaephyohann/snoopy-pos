import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

export const addonCategoriesRouter = express.Router();

addonCategoriesRouter.post(
  "/",
  checkAuth,
  async (req: Request, res: Response) => {
    const { name, menuIds, isRequired } = req.body;
    const isValid = name && isRequired !== undefined && menuIds.length;
    if (!isValid) return res.sendStatus(400);
    const newAddonCategoryResult = await db.query(
      "insert into addon_categories (name, is_required) values ($1, $2) returning *",
      [name, isRequired]
    );
    const newAddonCategoryId = newAddonCategoryResult.rows[0].id;
    menuIds.forEach(async (item: number) => {
      await db.query(
        "insert into menus_addon_categories (menus_id, addon_categories_id) values ($1, $2)",
        [item, newAddonCategoryId]
      );
    });
    res.sendStatus(200);
  }
);
