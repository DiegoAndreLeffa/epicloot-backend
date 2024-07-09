import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";

const userRepository: UserRepository = new TypeORMUserRepository();

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId || req.params.userId;
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (!user.isAdmin) {
    return next(new AppError("Forbidden: Only admins can perform this action", 403));
  }

  next();
};
