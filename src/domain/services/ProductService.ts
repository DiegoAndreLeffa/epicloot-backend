import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/ProductRepository";
import { AppError } from "../../interfaces/http/middleware/errors";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async createProduct(name: string, description: string, price: number, stock: number, categoryId: string): Promise<Product> {
    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = { id: categoryId } as any;

    await this.productRepository.save(product);
    return product;
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async updateProduct(id: string, updateData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    Object.assign(product, updateData);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    await this.productRepository.delete(id);
  }
}
