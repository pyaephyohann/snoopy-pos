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

export default menusRouter;
