import { Request, Response, NextFunction } from "express";

import { UserService } from "../../domain/services/UserService";
import { AppError } from "../../interfaces/http/middleware/errors";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password, isAdmin } = req.body;
    try {
      const user = await this.userService.registerUser(name, email, password, isAdmin);
      res.status(201).json(user);
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const user = await this.userService.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        next(new AppError("User not found", 404));
      }
    } catch (error: any) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await this.userService.updateUser(id, updateData);
      res.status(200).json(user);
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.userService.deleteUser(id);
      res.status(204).send();
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }

  async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.userService.authenticateUser(email, password);
      res.status(200).json(user);
    } catch (error: any) {
      next(new AppError(error.message, 401));
    }
  }
}
