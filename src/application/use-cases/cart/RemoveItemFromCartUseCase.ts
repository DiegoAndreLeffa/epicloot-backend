import { CartRepository } from "../../../domain/repositories/CartRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface RemoveItemFromCartRequest {
  userId: string;
  productId: string;
}

export class RemoveItemFromCartUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(request: RemoveItemFromCartRequest): Promise<void> {
    const { userId, productId } = request;

    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    cart.items = cart.items.filter(item => item.id !== productId);

    await this.cartRepository.save(cart);
  }
}
