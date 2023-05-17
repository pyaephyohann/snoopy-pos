import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";
import { config } from "./src/config/config";
import jwt from "jsonwebtoken";

const app = express();

console.log(config.jwtSrcret);

app.use(cors());
app.use(express.json());

app.get("/menus", async (req: Request, res: Response) => {
  const menusResult = await db.query("select * from menus");
  const menus = menusResult.rows;
  res.send({ menus });
});

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const hashedPassword = await bcrypt.hash(password, 10);
  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, hashedPassword];
  try {
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post("/auth/login", async (req: Request, res: Response) => {
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

app.listen(5000, () => {
  console.log("express is listening on port 5000");
});
