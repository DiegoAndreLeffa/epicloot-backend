// src/application/use-cases/product/CreateProductUseCase.ts
import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
}

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, description, price, stock, categoryId } = request;

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = { id: categoryId } as any;

    await this.productRepository.save(product);
    return product;
  }
}
