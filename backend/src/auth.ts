import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "./config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const headers = req.headers;
  const authorization = headers.authorization;
  if (!authorization) return res.sendStatus(401);
  try {
    const token = authorization.split(" ")[1];
    jwt.verify(token, config.jwtSrcret);
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};
