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

addonCategoriesRouter.put(
  "/removeMenu",
  checkAuth,
  async (req: Request, res: Response) => {
    const { menuId, addonCategoryId } = req.body;
    if (!menuId) return res.sendStatus(400);
    const existingMenusAddonCategories = await db.query(
      "select * from menus_addon_categories where menus_id = $1 and addon_categories_id = $2",
      [menuId, addonCategoryId]
    );
    const hasExistingMenusAddonCategories =
      existingMenusAddonCategories.rows.length;
    if (!hasExistingMenusAddonCategories) return res.sendStatus(400);
    await db.query(
      "update menus_addon_categories set is_archived = true where menus_id = $1 and addon_categories_id = $2",
      [menuId, addonCategoryId]
    );
    res.sendStatus(200);
  }
);

addonCategoriesRouter.put("/", async (req: Request, res: Response) => {
  const { name, isRequired, addonCategoryId } = req.body;
  if (name) {
    await db.query("update addon_categories set name = $1 where id = $2", [
      name,
      addonCategoryId,
    ]);
  }
  const hasIsRequired = isRequired !== undefined;
  if (!hasIsRequired) return res.sendStatus(400);
  await db.query("update addon_categories set is_required = $1 where id = $2", [
    isRequired,
    addonCategoryId,
  ]);
  res.sendStatus(200);
});
