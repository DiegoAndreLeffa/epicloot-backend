import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";
import jwt from "jsonwebtoken";

const userRepository: UserRepository = new TypeORMUserRepository();

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new AppError("Authorization header is required", 401));
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as { id: string, isAdmin: boolean };

    if (!decoded.isAdmin) {
      return next(new AppError("Forbidden: Only admins can perform this action", 403));
    }

    const user = await userRepository.findById(decoded.id);
    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (!user.isAdmin) {
      return next(new AppError("Forbidden: Only admins can perform this action", 403));
    }

    next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

