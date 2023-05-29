import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) return res.sendStatus(401);
  try {
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, config.jwtSrcret);
    //@ts-ignore
    req["email"] = user.email;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
