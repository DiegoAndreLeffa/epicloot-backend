import { Cart } from "../../../domain/entities";
import { 
  CartRepository, 
  UserRepository, 
  ProductRepository 
} from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateOrUpdateCartRequest {
  userId: string;
  productIds: string[];
}

export class CreateOrUpdateCartUseCase {
  constructor(
    private cartRepository: CartRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(request: CreateOrUpdateCartRequest): Promise<Cart> {
    const { userId, productIds } = request;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    let cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.createdAt = new Date();
    }

    const products = [];
    for (const productId of productIds) {
      const product = await this.productRepository.findById(productId);
      if (!product) {
        throw new AppError(`Product not found: ${productId}`, 404);
      }
      products.push(product);
    }

    cart.items = products;

    await this.cartRepository.save(cart);
    return cart;
  }
}
