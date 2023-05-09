import express, { Request, Response } from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/auth/register", (req: Request, res: Response) => {
  res.send(req.body);
});

app.listen(5000, () => {
  console.log("express is listening on port 5000");
});
