import { Product } from "../../../domain/entities";
import { ProductRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  categoryId?: string;
}

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(request: UpdateProductRequest): Promise<Product> {
    const { id, ...updateData } = request;

    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    Object.assign(product, updateData);
    await this.productRepository.save(product);
    return product;
  }
}
