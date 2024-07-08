// src/application/controllers/ProductController.ts
import { Request, Response, NextFunction } from "express";
import { CreateProductUseCase } from "../use-cases/product/CreateProductUseCase";
import { GetProductByIdUseCase } from "../use-cases/product/GetProductByIdUseCase";
import { GetAllProductsUseCase } from "../use-cases/product/GetAllProductsUseCase";
import { UpdateProductUseCase } from "../use-cases/product/UpdateProductUseCase";
import { DeleteProductUseCase } from "../use-cases/product/DeleteProductUseCase";

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getAllProductsUseCase: GetAllProductsUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, description, price, categoryName } = req.body;
    try {
      const product = await this.createProductUseCase.execute({ name, description, price, categoryName });
      res.status(201).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const product = await this.getProductByIdUseCase.execute(id);
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.getAllProductsUseCase.execute();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const product = await this.updateProductUseCase.execute({ id, ...updateData });
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteProductUseCase.execute(id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
