import { Payment } from "../entities";

export interface PaymentRepository {
  findById(id: string): Promise<Payment | null>;
  findAll(): Promise<Payment[]>;
  save(payment: Payment): Promise<void>;
  delete(id: string): Promise<void>;
}
