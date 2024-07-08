import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class DeleteOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    await this.orderRepository.delete(id);
  }
}
