import { Request, Response, NextFunction } from "express";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, DeleteProductUseCase } from "../use-cases/product";

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private getAllProductsUseCase: GetAllProductsUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, description, price, categoryNames, link } = req.body;

    let coverImage: string | null = null;
    let galleryImages: string[] = [];

    if (req.files && !Array.isArray(req.files)) {
      if (req.files['coverImage']) {
        coverImage = (req.files['coverImage'][0] as Express.Multer.File).path;
      }
      if (req.files['galleryImages']) {
        galleryImages = (req.files['galleryImages'] as Express.Multer.File[]).map(file => file.path);
      }
    }

    try {
      const product = await this.createProductUseCase.execute({ name, description, price, categoryNames, coverImage, galleryImages, link });
      const productWithCategories = await this.getProductByIdUseCase.execute(product.id);
      res.status(201).json(productWithCategories);
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
    const { name, description, price, categoryNames, link } = req.body;

    let coverImage: string | null = null;
    let galleryImages: string[] = [];

    if (req.files && !Array.isArray(req.files)) {
      if (req.files['coverImage']) {
        coverImage = (req.files['coverImage'][0] as Express.Multer.File).path;
      }
      if (req.files['galleryImages']) {
        galleryImages = (req.files['galleryImages'] as Express.Multer.File[]).map(file => file.path);
      }
    }

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price !== undefined) updateData.price = price;
    if (categoryNames) updateData.categoryNames = categoryNames;
    if (coverImage) updateData.coverImage = coverImage;
    if (galleryImages.length > 0) updateData.galleryImages = galleryImages;
    if (link) updateData.link = link;

    try {
      const updatedProduct = await this.updateProductUseCase.execute({ id, ...updateData });
      const productWithCategories = await this.getProductByIdUseCase.execute(updatedProduct.id);
      res.status(200).json(productWithCategories);
    } catch (error: any) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = req.params.id;
    try {
      await this.deleteProductUseCase.execute({id});
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }
}
