import { Order } from "../../../domain/entities/Order";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateOrderRequest {
  userId: string;
  status: string;
  paymentId: string;
}

export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private userRepository: UserRepository
  ) {}

  async execute(request: CreateOrderRequest): Promise<Order> {
    const { userId, status, paymentId } = request;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const order = new Order();
    order.user = user;
    order.date = new Date();
    order.status = status;
    order.payment = { id: paymentId } as any;

    await this.orderRepository.save(order);
    return order;
  }
}
