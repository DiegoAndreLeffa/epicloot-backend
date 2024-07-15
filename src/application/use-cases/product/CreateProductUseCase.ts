import { Product } from "../../../domain/entities/Product";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { CategoryRepository } from "../../../domain/repositories/CategoryRepository";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryNames: string[];
  coverImage?: string | null;
  galleryImages?: string[];
  link?: string; // Novo campo link
}

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, description, price, categoryNames, coverImage, galleryImages, link } = request;

    const categories = [];
    for (const categoryName of categoryNames) {
      let category = await this.categoryRepository.findByName(categoryName);
      if (!category) {
        category = this.categoryRepository.create({ name: categoryName });
        await this.categoryRepository.save(category);
      }
      categories.push(category);
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.categories = categories;
    product.coverImage = coverImage || '';
    product.galleryImages = galleryImages || [];
    product.link = link || '';

    await this.productRepository.save(product);

    return product;
  }
}
