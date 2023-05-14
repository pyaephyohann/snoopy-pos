import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";
import bcrypt from "bcrypt";

const app = express();

app.use(cors());
app.use(express.json());

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
  const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
  return isCorrectPassword ? res.sendStatus(200) : res.sendStatus(401);
});

app.listen(5000, () => {
  console.log("express is listening on port 5000");
});
