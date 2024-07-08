import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
