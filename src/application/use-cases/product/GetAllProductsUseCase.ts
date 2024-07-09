import { Product } from "../../../domain/entities";
import { ProductRepository } from "../../../domain/repositories";

export class GetAllProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepository.findAll();
  }
}
