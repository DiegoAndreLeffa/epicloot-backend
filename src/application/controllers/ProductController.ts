import { Request, Response, NextFunction } from "express";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, DeleteProductUseCase } from "../use-cases/product";

interface MulterRequest extends Request {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
}

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
    const multerReq = req as MulterRequest;
    const coverImage = multerReq.files && multerReq.files['coverImage'] ? multerReq.files['coverImage'][0].path : null;
    const galleryImages = multerReq.files && multerReq.files['galleryImages'] ? multerReq.files['galleryImages'].map(file => file.path) : [];

    try {
      const product = await this.createProductUseCase.execute({ name, description, price, categoryName, coverImage, galleryImages });
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
    const multerReq = req as MulterRequest;
    const coverImage = multerReq.files && multerReq.files['coverImage'] ? multerReq.files['coverImage'][0].path : null;
    const galleryImages = multerReq.files && multerReq.files['galleryImages'] ? multerReq.files['galleryImages'].map(file => file.path) : [];

    if (coverImage) {
      updateData.coverImage = coverImage;
    }
    if (galleryImages.length > 0) {
      updateData.galleryImages = galleryImages;
    }

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
      await this.deleteProductUseCase.execute({ id });
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
