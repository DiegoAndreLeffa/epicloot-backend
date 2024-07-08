import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}
