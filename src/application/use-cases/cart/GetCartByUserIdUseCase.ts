import { Cart } from "../../../domain/entities";
import { CartRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class GetCartByUserIdUseCase {
  constructor(private cartRepository: CartRepository) {}

  async execute(userId: string): Promise<Cart | null> {
    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }
    return cart;
  }
}
