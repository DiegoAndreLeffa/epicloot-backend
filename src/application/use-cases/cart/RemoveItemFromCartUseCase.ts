import { CartRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface RemoveCartItemRequest {
  cartId: string;
  productId: string;
}

export class RemoveItemFromCartUseCase {
  constructor(
    private cartRepository: CartRepository,
  ) {}

  async execute(request: RemoveCartItemRequest): Promise<void> {
    const { cartId, productId } = request;

    console.log(cartId, productId);

    const cart = await this.cartRepository.findById(cartId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const productIndex = cart.items.findIndex(item => item.id === productId);
    if (productIndex === -1) {
      throw new AppError("Product not found in cart", 404);
    }

    cart.items.splice(productIndex, 1);

    await this.cartRepository.save(cart);
  }
}
