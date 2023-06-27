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
  const { name, description, price, assetUrl, menuCategorieIds, locationId } =
    req.body;
  const isValid =
    name && description && price && assetUrl && menuCategorieIds.length;
  if (!isValid) return res.sendStatus(400);
  const menuResult = await db.query(
    "insert into menus (name, description, price, asset_url) values ($1, $2, $3, $4) returning *",
    [name, description, price, assetUrl]
  );
  const menuId = menuResult.rows[0].id;
  menuCategorieIds.forEach(async (item: number) => {
    await db.query(
      "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values($1, $2, $3)",
      [menuId, item, Number(locationId)]
    );
  });
  res.sendStatus(200);
});

menusRouter.put("/", checkAuth, async (req: Request, res: Response) => {
  const { menuId, name, description, assetUrl } = req.body;
  if (name) {
    await db.query("update menus set name = $1 where id = $2", [name, menuId]);
  }
  if (description) {
    await db.query("update menus set description = $1 where id = $2", [
      description,
      menuId,
    ]);
  }
  if (assetUrl) {
    await db.query("update menus set asset_url = $1 where id = $2", [
      assetUrl,
      menuId,
    ]);
  }
  const existingMenu = await db.query("select * from menus where id = $1", [
    menuId,
  ]);
  const price = req.body.price || existingMenu.rows[0].price;
  await db.query("update menus set price = $1 where id = $2", [price, menuId]);
  res.sendStatus(200);
});

menusRouter.delete("/", checkAuth, async (req: Request, res: Response) => {
  const { menuId, locationId } = req.body;
  const isValid = menuId && locationId;
  if (!isValid) return res.sendStatus(400);
  const existingMenusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where menus_id = $1 and locations_id = $2",
    [menuId, locationId]
  );
  const hasExistingMenusMenuCategoriesLocations =
    existingMenusMenuCategoriesLocations.rows.length;
  if (!hasExistingMenusMenuCategoriesLocations) return res.sendStatus(400);
  existingMenusMenuCategoriesLocations.rows.forEach(async (item) => {
    await db.query(
      "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and locations_id = $2",
      [menuId, locationId]
    );
  });
  res.sendStatus(200);
});

export default menusRouter;
