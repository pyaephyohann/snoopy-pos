import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const locationsRouter = express.Router();

locationsRouter.put("/", checkAuth, async (req: Request, res: Response) => {
  res.sendStatus(200);
});

locationsRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { name, address, companyId } = req.body;
  const isValid = name && address && companyId;
  if (!isValid) return res.sendStatus(400);
  await db.query(
    "insert into locations (name, address, companies_id) values($1, $2, $3)",
    [name, address, companyId]
  );
  res.sendStatus(200);
});

export default locationsRouter;
