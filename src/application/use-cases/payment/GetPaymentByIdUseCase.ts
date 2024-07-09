import { Payment } from "../../../domain/entities";
import { PaymentRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class GetPaymentByIdUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(id: string): Promise<Payment | null> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }
    return payment;
  }
}
