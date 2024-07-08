// src/application/use-cases/product/CreateProductUseCase.ts
import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";
import { Category } from "../../../domain/entities/Category";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryName: string;
}

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, description, price, categoryName } = request;

    let category = await this.categoryRepository.findByName(categoryName);
    if (!category) {
      category = new Category();
      category.name = categoryName;
      await this.categoryRepository.save(category);
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    await this.productRepository.save(product);
    return product;
  }
}
