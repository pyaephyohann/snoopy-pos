import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

export const menuCategoriesRouter = express.Router();

menuCategoriesRouter.put("/", async (req: Request, res: Response) => {
  const { menuCategoryId, name, locationIds } = req.body;
  if (!menuCategoryId) return res.sendStatus(400);
  if (name) {
    await db.query("update menu_categories set name = $1 where id = $2", [
      name,
      menuCategoryId,
    ]);
  }
  if (!locationIds.length) {
    await db.query(
      "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1",
      [menuCategoryId]
    );
    return res.sendStatus(200);
  }
  // get existing locations
  const existingLocations = await db.query(
    "select locations_id from menus_menu_categories_locations where menu_categories_id = $1 and is_archived = false",
    [menuCategoryId]
  );
  const existingLocationIds = existingLocations.rows.map(
    (item) => item.locations_id
  );

  // update removed locations
  const removedLocations = existingLocationIds.filter(
    (item) => !locationIds.includes(item)
  );
  if (removedLocations.length) {
    removedLocations.forEach(async (item) => {
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where menu_categories_id = $1 and locations_id = $2",
        [menuCategoryId, item]
      );
    });
  }

  // insert added locations
  const addedLocations = locationIds.filter(
    (item: number) => !existingLocationIds.includes(item)
  );

  if (addedLocations.length) {
    addedLocations.forEach(async (item: number) => {
      await db.query(
        "insert into menus_menu_categories_locations (menu_categories_id, locations_id) values($1, $2)",
        [menuCategoryId, item]
      );
    });
  }

  res.send(existingLocations.rows);
});

menuCategoriesRouter.put("/removeMenu", async (req: Request, res: Response) => {
  const { menuId, menuCategoryId, locationId } = req.body;
  const isValid = menuId && menuCategoryId && locationId;
  if (!isValid) return res.sendStatus(400);
  const existingMenusMenuCategoriesLocations = await db.query(
    "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  const hasExistingMenusMenuCategoriesLocations =
    existingMenusMenuCategoriesLocations.rows.length;
  if (!hasExistingMenusMenuCategoriesLocations) return res.sendStatus(400);
  await db.query(
    "update menus_menu_categories_locations set is_archived = true where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
    [menuId, menuCategoryId, locationId]
  );
  res.sendStatus(200);
});

menuCategoriesRouter.delete(
  "/:menuCategoryId",
  async (req: Request, res: Response) => {
    const { locationId } = req.body;
    const isValid = locationId && req.params.menuCategoryId;
    if (!isValid) return res.sendStatus(400);
    const existingMenusMenuCategoriesLocations = await db.query(
      "select * from menus_menu_categories_locations where menu_categories_id = $1 and locations_id = $2",
      [req.params.menuCategoryId, locationId]
    );
    const hasExistingMenusMenuCategoriesLocations =
      existingMenusMenuCategoriesLocations.rows.length;
    if (!hasExistingMenusMenuCategoriesLocations) return res.sendStatus(400);
    existingMenusMenuCategoriesLocations.rows.forEach(async (item) => {
      const menusMenuCategoriesLocationsId = item.id;
      await db.query(
        "update menus_menu_categories_locations set is_archived = true where id = $1",
        [menusMenuCategoriesLocationsId]
      );
    });
    res.sendStatus(200);
  }
);

menuCategoriesRouter.post("/", async (req: Request, res: Response) => {
  const { name, locationIds } = req.body;
  const isValid = name && locationIds.length;
  if (!isValid) return res.sendStatus(400);
  const newMenuCategoryResult = await db.query(
    "insert into menu_categories (name) values ($1) returning *",
    [name]
  );
  const newMenuCategoryId = newMenuCategoryResult.rows[0].id;
  locationIds.forEach(async (item: number) => {
    await db.query(
      "insert into menus_menu_categories_locations (menu_categories_id, locations_id) values ($1, $2)",
      [newMenuCategoryId, item]
    );
  });
  res.sendStatus(200);
});

menuCategoriesRouter.put("/addMenu", async (req: Request, res: Response) => {
  const { menuIds, menuCategoryId, locationIds } = req.body;
  const isValid = menuIds.length && menuCategoryId && locationIds.length;
  if (!isValid) return res.sendStatus(400);
  menuIds.map((menuId: number) => {
    locationIds.map(async (locationId: number) => {
      const existingMenusMenuCategoriesLocations = await db.query(
        "select * from menus_menu_categories_locations where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
        [menuId, menuCategoryId, locationId]
      );
      const isExist = existingMenusMenuCategoriesLocations.rows.length;
      if (isExist) {
        await db.query(
          "update menus_menu_categories_locations set is_archived = false where menus_id = $1 and menu_categories_id = $2 and locations_id = $3",
          [menuId, menuCategoryId, locationId]
        );
      } else {
        await db.query(
          "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) values ($1, $2, $3)",
          [menuId, menuCategoryId, locationId]
        );
      }
    });
  });
  res.sendStatus(200);
});
