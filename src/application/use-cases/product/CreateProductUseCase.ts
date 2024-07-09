import { 
  Product, 
  Category 
} from "../../../domain/entities";
import { 
  ProductRepository, 
  CategoryRepository 
} from "../../../domain/repositories";

interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  categoryName: string;
}

export class CreateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private categoryRepository: CategoryRepository
  ) {}

  async execute(request: CreateProductRequest): Promise<Product> {
    const { name, description, price, categoryName } = request;

    let category = await this.categoryRepository.findByName(categoryName);
    if (!category) {
      category = new Category();
      category.name = categoryName;
      await this.categoryRepository.save(category);
    }

    const product = new Product();
    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;

    await this.productRepository.save(product);
    return product;
  }
}
