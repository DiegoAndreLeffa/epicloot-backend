import { Payment } from "../../../domain/entities";
import { PaymentRepository } from "../../../domain/repositories";

export class GetAllPaymentsUseCase {
  constructor(private paymentRepository: PaymentRepository) {}

  async execute(): Promise<Payment[]> {
    return this.paymentRepository.findAll();
  }
}
