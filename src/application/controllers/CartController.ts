import { Request, Response, NextFunction } from "express";

import { 
  CreateOrUpdateCartUseCase, 
  GetCartByUserIdUseCase, 
  RemoveItemFromCartUseCase 
} from "../use-cases/cart";
import { AppError } from "../../interfaces/http/middleware/errors";

export class CartController {
  constructor(
    private createOrUpdateCartUseCase: CreateOrUpdateCartUseCase,
    private getCartByUserIdUseCase: GetCartByUserIdUseCase,
    private RemoveItemFromCartUseCase: RemoveItemFromCartUseCase
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
    const cartId = req.params.id;
    const { productId } = req.body;

    if (!productId) {
      return next(new AppError("Product ID is required", 400));
    }

    try {
      await this.RemoveItemFromCartUseCase.execute({ cartId, productId });
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
