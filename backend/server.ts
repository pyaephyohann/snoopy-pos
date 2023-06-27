import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";
import { config } from "./src/config/config";
import jwt from "jsonwebtoken";
import { checkAuth } from "./src/utils/auth";
import authRouter from "./src/routers/authRouter";
import { menuCategoriesRouter } from "./src/routers/menuCategoriesRouter";
import menusRouter from "./src/routers/menusRouter";
import appRouter from "./src/routers/appRouter";
import locationsRouter from "./src/routers/locationsRouter";
import { tablesRouter } from "./src/routers/tablesRouter";
import { addonRouter } from "./src/routers/addonRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", appRouter);
app.use("/menus", menusRouter);
app.use("/locations", locationsRouter);
app.use("/menu-categories", menuCategoriesRouter);
app.use("/auth", authRouter);
app.use("/tables", tablesRouter);
app.use("/addons", addonRouter);

app.listen(5000, () => {
  console.log("express is listening on port 5000");
});
