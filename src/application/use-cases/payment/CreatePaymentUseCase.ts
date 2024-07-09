import { Payment } from "../../../domain/entities";
import { 
  PaymentRepository, 
  CartRepository, 
  UserRepository 
} from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreatePaymentRequest {
  userId: string;
  type: string;
  amount: number;
}

export class CreatePaymentUseCase {
  constructor(
    private paymentRepository: PaymentRepository,
    private cartRepository: CartRepository,
    private userRepository: UserRepository
  ) {}

  async execute(request: CreatePaymentRequest): Promise<Payment> {
    const { userId, type, amount } = request;

    const cart = await this.cartRepository.findByUserId(userId);
    if (!cart) {
      throw new AppError("Cart not found", 404);
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const payment = new Payment();
    payment.user = cart.user;
    payment.type = type;
    payment.date = new Date();
    payment.amount = amount;
    payment.items = cart.items;

    await this.paymentRepository.save(payment);

    user.myGames = [...user.myGames, ...cart.items];
    await this.userRepository.save(user);

    cart.items = [];
    await this.cartRepository.save(cart);

    return payment;
  }
}
