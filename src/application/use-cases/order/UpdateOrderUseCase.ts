import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface UpdateOrderRequest {
  id: string;
  status?: string;
  paymentId?: string;
}

export class UpdateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(request: UpdateOrderRequest): Promise<Order> {
    const { id, ...updateData } = request;

    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new AppError("Order not found", 404);
    }

    Object.assign(order, updateData);
    await this.orderRepository.save(order);
    return order;
  }
}
