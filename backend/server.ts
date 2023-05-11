import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./src/db/db";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/register", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.sendStatus(400);
  const text =
    "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *";
  const values = [name, email, password];
  try {
    const userResult = await db.query(text, values);
    const user = userResult.rows[0];
    delete user.password;
    res.send(user);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log("express is listening on port 5000");
});
