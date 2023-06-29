import express, { Request, Response } from "express";
import { checkAuth } from "../utils/auth";
import { db } from "./../db/db";
import { fileUpload } from "../utils/fileUpload";

const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  const user = await db.query("select * from users where email = $1", [
    //@ts-ignore
    req.email,
  ]);
  const userRows = user.rows;
  if (!userRows.length) return res.sendStatus(401);
  const companyId = user.rows[0].companies_id;
  const company = await db.query("select * from companies where id = $1", [
    companyId,
  ]);
  const locationsResult = await db.query(
    "select * from locations where companies_id = $1",
    [companyId]
  );
  const locationIds = locationsResult.rows.map((row) => row.id);
  const menusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where is_archived = false and locations_id = ANY($1::int[])",
    [locationIds]
  );
  const menusIds = menusMenuCategoriesLocations.rows.map((row) => row.menus_id);
  const menus = await db.query(
    "select * from menus where id = ANY($1::int[])",
    [menusIds]
  );
  const menuCategoriesIds = menusMenuCategoriesLocations.rows.map(
    (row) => row.menu_categories_id
  );
  const menuCategories = await db.query(
    "select * from menu_categories where id = ANY($1::int[])",
    [menuCategoriesIds]
  );
  const menusAddonCategories = await db.query(
    "select * from menus_addon_categories where menus_id = ANY($1::int[]) and is_archived = false",
    [menusIds]
  );
  const addonCategoriesIds = menusAddonCategories.rows.map(
    (row) => row.addon_categories_id
  );
  const addonCategories = await db.query(
    "select * from addon_categories where id = ANY($1::int[])",
    [addonCategoriesIds]
  );
  const addons = await db.query(
    "select * from addons where addon_categories_id = ANY($1::int[]) and is_archived = false",
    [addonCategoriesIds]
  );
  const tables = await db.query(
    "select * from tables where locations_id = ANY($1::int[])",
    [[locationIds]]
  );
  res.send({
    user: user.rows[0],
    company: company.rows[0],
    locations: locationsResult.rows,
    menus: menus.rows,
    menuCategories: menuCategories.rows,
    addonCategories: addonCategories.rows,
    addons: addons.rows,
    tables: tables.rows,
    menusMenuCategoriesLocations: menusMenuCategoriesLocations.rows,
    menusAddonCategories: menusAddonCategories.rows,
  });
});

appRouter.post("/assets", (req: Request, res: Response) => {
  try {
    fileUpload(req, res, async (error) => {
      if (error) {
        return res.sendStatus(500);
      }
      const files = req.files as Express.MulterS3.File[];
      const file = files[0];
      const assetUrl = file.location;
      res.send({ assetUrl });
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

export default appRouter;
