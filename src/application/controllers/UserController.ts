import { Request, Response, NextFunction } from "express";

import { 
  CreateUserUseCase, 
  GetUserByIdUseCase, 
  UpdateUserUseCase, 
  DeleteUserUseCase 
} from "../use-cases/user";

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private getUserByIdUseCase: GetUserByIdUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, password, isAdmin } = req.body;
    try {
      const user = await this.createUserUseCase.execute({ name, email, password, isAdmin });
      res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const user = await this.getUserByIdUseCase.execute(id);
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const user = await this.updateUserUseCase.execute({ id, ...updateData });
      res.status(200).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteUserUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
