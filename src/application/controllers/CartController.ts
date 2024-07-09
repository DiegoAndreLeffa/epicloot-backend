import { Request, Response, NextFunction } from "express";
import { CreateOrUpdateCartUseCase } from "../use-cases/cart/CreateOrUpdateCartUseCase";
import { GetCartByUserIdUseCase } from "../use-cases/cart/GetCartByUserIdUseCase";
import { RemoveItemFromCartUseCase } from "../use-cases/cart/RemoveItemFromCartUseCase";

export class CartController {
  constructor(
    private createOrUpdateCartUseCase: CreateOrUpdateCartUseCase,
    private getCartByUserIdUseCase: GetCartByUserIdUseCase,
    private removeItemFromCartUseCase: RemoveItemFromCartUseCase
  ) {}

  async createOrUpdate(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, productIds } = req.body;
    try {
      const cart = await this.createOrUpdateCartUseCase.execute({ userId, productIds });
      res.status(201).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    const userId = req.params.userId;
    try {
      const cart = await this.getCartByUserIdUseCase.execute(userId);
      res.status(200).json(cart);
    } catch (error: any) {
      next(error);
    }
  }

  async removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, productId } = req.body;
    try {
      await this.removeItemFromCartUseCase.execute({ userId, productId });
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
