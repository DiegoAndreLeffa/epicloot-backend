import { PaymentRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class DeletePaymentUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(id: string): Promise<void> {
    const payment = await this.paymentRepository.findById(id);
    if (!payment) {
      throw new AppError("Payment not found", 404);
    }

    await this.paymentRepository.delete(id);
  }
}
