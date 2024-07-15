import { cloudinary } from "../../../config/cloudinaryConfig";
import { ProductRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface DeleteProductRequest {
  id: string;
}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id }: DeleteProductRequest): Promise<void> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product.coverImage) {
      await cloudinary.uploader.destroy(product.coverImage);
    }
    if (product.galleryImages && product.galleryImages.length > 0) {
      for (const image of product.galleryImages) {
        await cloudinary.uploader.destroy(image);
      }
    }

    await this.productRepository.delete(id);
  }
}
