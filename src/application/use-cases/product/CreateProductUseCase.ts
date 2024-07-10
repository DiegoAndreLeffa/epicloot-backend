import { Product } from '../../../domain/entities/Product';
import { ProductRepository } from '../../../domain/repositories/ProductRepository';
import { CategoryRepository } from '../../../domain/repositories/CategoryRepository';
import { AppError } from '../../../interfaces/http/middleware/errors';

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryName: string;
  coverImage?: string | null;
  galleryImages?: string[];
}

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, description, price, categoryName, coverImage, galleryImages } = request;

    let category = await this.categoryRepository.findByName(categoryName);
    if (!category) {
      category = this.categoryRepository.create({ name: categoryName });
      await this.categoryRepository.save(category);
    }

    if (!category) {
      throw new AppError('Category could not be created or found', 400);
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.coverImage = coverImage || '';
    product.galleryImages = galleryImages || [];

    await this.productRepository.save(product);

    return product;
  }
}
