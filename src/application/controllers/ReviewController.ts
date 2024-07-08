import { Request, Response, NextFunction } from "express";
import { CreateReviewUseCase } from "../use-cases/review/CreateReviewUseCase";
import { GetReviewByIdUseCase } from "../use-cases/review/GetReviewByIdUseCase";
import { GetAllReviewsUseCase } from "../use-cases/review/GetAllReviewsUseCase";
import { UpdateReviewUseCase } from "../use-cases/review/UpdateReviewUseCase";
import { DeleteReviewUseCase } from "../use-cases/review/DeleteReviewUseCase";

export class ReviewController {
  constructor(
    private createReviewUseCase: CreateReviewUseCase,
    private getReviewByIdUseCase: GetReviewByIdUseCase,
    private getAllReviewsUseCase: GetAllReviewsUseCase,
    private updateReviewUseCase: UpdateReviewUseCase,
    private deleteReviewUseCase: DeleteReviewUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId, productId, rating, comment } = req.body;
    try {
      const review = await this.createReviewUseCase.execute({ userId, productId, rating, comment });
      res.status(201).json(review);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const review = await this.getReviewByIdUseCase.execute(id);
      res.status(200).json(review);
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reviews = await this.getAllReviewsUseCase.execute();
      res.status(200).json(reviews);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const review = await this.updateReviewUseCase.execute({ id, ...updateData });
      res.status(200).json(review);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteReviewUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
