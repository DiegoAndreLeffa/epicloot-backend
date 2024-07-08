import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class GetOrderByIdUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string): Promise<Order | null> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }
    return order;
  }
}
