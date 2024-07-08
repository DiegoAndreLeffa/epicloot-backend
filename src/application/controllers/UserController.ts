import { Request, Response, NextFunction } from "express";

import { CreateUserUseCase } from "../use-cases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../use-cases/user/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../use-cases/user/DeleteUserUseCase";
import { AuthenticateUserUseCase } from "../use-cases/user/AuthenticateUserUseCase";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  async register(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password, isAdmin } = req.body;
    try {
      const user = await this.createUserUseCase.execute({ name, email, password, isAdmin });
      res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const user = await this.getUserByIdUseCase.execute(id);
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await this.updateUserUseCase.execute({ id, ...updateData });
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteUserUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  async authenticateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    try {
      const user = await this.authenticateUserUseCase.execute({ email, password });
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }
}
