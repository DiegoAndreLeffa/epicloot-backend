import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

interface UpdateProductRequest {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  categoryNames?: string[];
  coverImage?: string;
  galleryImages?: string[];
  link?: string;
}

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(request: UpdateProductRequest): Promise<Product> {
    const { id, name, description, price, categoryNames, coverImage, galleryImages, link } = request;

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new Error('Product not found');
    }

    if (name) {
      product.name = name;
    }
    if (description) {
      product.description = description;
    }
    if (price !== undefined) {
      product.price = Number(price);
    }

    if (categoryNames) {
      const categories = [];
      for (const categoryName of categoryNames) {
        let category = await this.categoryRepository.findByName(categoryName);
        if (!category) {
          category = this.categoryRepository.create({ name: categoryName });
          await this.categoryRepository.save(category);
        }
        categories.push(category);
      }
      product.categories = categories;
    }

    if (coverImage !== undefined) {
      product.coverImage = coverImage || '';
    }
    if (galleryImages !== undefined) {
      product.galleryImages = galleryImages || [];
    }
    if (link !== undefined) {
      product.link = link || '';
    }

    await this.productRepository.save(product);

    return product;
  }
}
