import express, { Request, Response } from "express";
import { db } from "../db/db";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import jwt from "jsonwebtoken";

const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const isValid =
    name &&
    name.length > 0 &&
    email &&
    email.length > 0 &&
    password &&
    password.length > 0;
  if (!isValid)
    return res.send({
      error: "You need to fill all of your registration forms",
    });
  const isExisted = await db.query("select * from users where email =$1", [
    email,
  ]);
  if (isExisted.rows.length)
    return res.send({ message: "User already exists" });

  const companyResult = await db.query(
    "insert into companies (name) values ($1) returning *",
    ["Default Company"]
  );

  const defaultCompanyId = companyResult.rows[0].id;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await db.query(
    "insert into users (name, email, password, companies_id) values($1, $2, $3, $4) returning *",
    [name, email, hashedPassword, defaultCompanyId]
  );
  try {
    const locationResult = await db.query(
      `insert into locations (name, address, companies_id) values('Default Location', 'Default Address', ${defaultCompanyId}) returning *`
    );
    const defaultLocationId = locationResult.rows[0].id;
    const menusResult = await db.query(
      "insert into menus (name, price) select * from unnest ($1::text[], $2::int[]) returning *",
      [
        ["Shan-khout-Swell", "Lat-Phat-Thote"],
        [2000, 1500],
      ]
    );
    const defaultMenuId1 = menusResult.rows[0].id;
    const defaultMenuId2 = menusResult.rows[1].id;
    const menuCategoriesResult = await db.query(
      "insert into menu_categories (name) select * from unnest ($1::text[]) returning *",
      [["Default-menu-categories-1", "default-menu-categories-2"]]
    );
    const defaultMenuCategoriesId1 = menuCategoriesResult.rows[0].id;
    const defaultMenuCategoriesId2 = menuCategoriesResult.rows[1].id;
    const addonCategoriesResult = await db.query(
      "insert into addon_categories (name, is_required) values('Drinks', true), ('Sizes', true) returning *"
    );
    await db.query(
      "insert into menus_menu_categories_locations (menus_id, menu_categories_id, locations_id) select * from unnest ($1::int[], $2::int[], $3::int[])",
      [
        [defaultMenuId1, defaultMenuId2],
        [defaultMenuCategoriesId1, defaultMenuCategoriesId2],
        [defaultLocationId, defaultLocationId],
      ]
    );
    const defaultAddonCategoriesId1 = addonCategoriesResult.rows[0].id;
    const defaultAddonCategoriesId2 = addonCategoriesResult.rows[1].id;
    await db.query(
      `insert into addons (name, price, addon_categories_id) values('Cola' , 700, ${defaultAddonCategoriesId1}), ('Pepsi', 800, ${defaultAddonCategoriesId1}), ('Large', 3000, ${defaultAddonCategoriesId2}), ('Small', 1000, ${defaultAddonCategoriesId2})`
    );
    await db.query(
      `insert into menus_addon_categories (menus_id, addon_categories_id) values(${defaultMenuId1}, ${defaultAddonCategoriesId1}), (${defaultMenuId2}, ${defaultAddonCategoriesId2})`
    );
  } catch (error) {
    console.log(error);
  }
  res.send(newUser.rows);
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) return res.sendStatus(400);
  const userResult = await db.query("select * from users where email = $1", [
    email,
  ]);
  const user = userResult.rows[0];
  const hashedPassword = user.password;
  delete user.password;
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  if (isCorrectPassword) {
    const accessToken = jwt.sign(user, config.jwtSrcret);
    return res.send({ accessToken });
  }
  return res.sendStatus(401);
});

export default authRouter;
