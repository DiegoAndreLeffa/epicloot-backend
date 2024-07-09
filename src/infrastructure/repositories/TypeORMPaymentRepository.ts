import { Repository } from "typeorm";

import { Payment } from "../../domain/entities";
import { PaymentRepository } from "../../domain/repositories";

import { AppDataSource } from "../database/data-source";

export class TypeORMPaymentRepository implements PaymentRepository {
  private ormRepository: Repository<Payment> = AppDataSource.getRepository(Payment);

  async findById(id: string): Promise<Payment | null> {
    return await this.ormRepository.findOne({ where: { id }, relations: ["items", "user"] });
  }

  async findAll(): Promise<Payment[]> {
    return this.ormRepository.find({ relations: ["items", "user"] });
  }

  async save(payment: Payment): Promise<void> {
    await this.ormRepository.save(payment);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
