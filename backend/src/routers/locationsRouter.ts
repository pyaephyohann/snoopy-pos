import express, { Request, Response } from "express";
import { db } from "../db/db";
import { checkAuth } from "../utils/auth";

const locationsRouter = express.Router();

locationsRouter.put(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    const { name, address } = req.body;
    if (!locationId) return res.sendStatus(400);
    const existingLocation = await db.query(
      "select * from locations where id = $1",
      [locationId]
    );
    if (!existingLocation.rows.length) return res.sendStatus(400);
    if (name) {
      await db.query("update locations set name = $1 where id = $2", [
        name,
        locationId,
      ]);
    }
    if (address) {
      await db.query("update locations set address = $1 where id = $2", [
        address,
        locationId,
      ]);
    }
    res.sendStatus(200);
  }
);

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

locationsRouter.delete(
  "/:locationId",
  checkAuth,
  async (req: Request, res: Response) => {
    const locationId = req.params.locationId;
    if (!locationId) return res.sendStatus(400);
    const existingLocation = await db.query(
      "select * from locations where id = $1",
      [locationId]
    );
    if (!existingLocation.rows.length) return res.sendStatus(400);
    await db.query("update locations set is_archived = true where id = $1", [
      locationId,
    ]);
    res.sendStatus(200);
  }
);

export default locationsRouter;
