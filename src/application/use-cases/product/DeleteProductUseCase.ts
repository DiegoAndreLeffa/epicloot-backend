import { ProductRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await this.productRepository.delete(id);
  }
}
