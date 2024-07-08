import { Request, Response, NextFunction } from "express";

import { ProductService } from "../../domain/services/ProductService";
import { AppError } from "../../interfaces/http/middleware/errors";

export class ProductController {
  constructor(private productService: ProductService) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, description, price, stock, categoryId } = req.body;
    try {
      const product = await this.productService.createProduct(name, description, price, stock, categoryId);
      res.status(201).json(product);
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }

  async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      const product = await this.productService.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        next(new AppError("Product not found", 404));
      }
    } catch (error: any) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(products);
    } catch (error: any) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const product = await this.productService.updateProduct(id, updateData);
      res.status(200).json(product);
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.productService.deleteProduct(id);
      res.status(204).send();
    } catch (error: any) {
      next(new AppError(error.message));
    }
  }
}
