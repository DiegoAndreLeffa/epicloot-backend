import { Request, Response, NextFunction } from "express";

import { 
  CreatePaymentUseCase, 
  GetPaymentByIdUseCase, 
  GetAllPaymentsUseCase, 
  DeletePaymentUseCase 
} from "../use-cases/payment";

export class PaymentController {
  constructor(
    private createPaymentUseCase: CreatePaymentUseCase,
    private getPaymentByIdUseCase: GetPaymentByIdUseCase,
    private getAllPaymentsUseCase: GetAllPaymentsUseCase,
    private deletePaymentUseCase: DeletePaymentUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, type, amount } = req.body;
    try {
      const payment = await this.createPaymentUseCase.execute({ userId, type, amount });
      res.status(201).json(payment);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const payment = await this.getPaymentByIdUseCase.execute(id);
      res.status(200).json(payment);
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const payments = await this.getAllPaymentsUseCase.execute();
      res.status(200).json(payments);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deletePaymentUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
