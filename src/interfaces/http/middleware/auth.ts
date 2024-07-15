import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "./errors";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(new AppError("Authorization header is missing", 401));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Token is missing", 401));
  }

  try {
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY as string);
    req.body.authUserId = decoded.id;
    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};
