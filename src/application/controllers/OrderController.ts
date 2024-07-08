import { Request, Response, NextFunction } from "express";

import { CreateOrderUseCase } from "../use-cases/order/CreateOrderUseCase";
import { GetOrderByIdUseCase } from "../use-cases/order/GetOrderByIdUseCase";
import { GetAllOrdersUseCase } from "../use-cases/order/GetAllOrdersUseCase";
import { UpdateOrderUseCase } from "../use-cases/order/UpdateOrderUseCase";
import { DeleteOrderUseCase } from "../use-cases/order/DeleteOrderUseCase";

export class OrderController {
  constructor(
    private createOrderUseCase: CreateOrderUseCase,
    private getOrderByIdUseCase: GetOrderByIdUseCase,
    private getAllOrdersUseCase: GetAllOrdersUseCase,
    private updateOrderUseCase: UpdateOrderUseCase,
    private deleteOrderUseCase: DeleteOrderUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, status, paymentId } = req.body;
    try {
      const order = await this.createOrderUseCase.execute({ userId, status, paymentId });
      res.status(201).json(order);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const order = await this.getOrderByIdUseCase.execute(id);
      res.status(200).json(order);
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orders = await this.getAllOrdersUseCase.execute();
      res.status(200).json(orders);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const order = await this.updateOrderUseCase.execute({ id, ...updateData });
      res.status(200).json(order);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteOrderUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
