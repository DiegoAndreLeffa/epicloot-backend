import { Request, Response, NextFunction } from "express";
import { AppError } from "./errors";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";

const userRepository: UserRepository = new TypeORMUserRepository();

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.body.userId || req.params.userId || req.params.id;
  if (!userId) {
    return next(new AppError("User ID is required", 400));
  }

  const user = await userRepository.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404));
  }

  const authUserId = req.body.authUserId;
  if (authUserId !== userId) {
    return next(new AppError("Forbidden: You can only access or modify your own profile", 403));
  }

  next();
};
