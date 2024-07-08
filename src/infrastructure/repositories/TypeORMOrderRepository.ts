import { Repository } from "typeorm";

import { Order } from "../../domain/entities/Order";
import { OrderRepository } from "../../domain/repositories/OrderRepository";
import { AppDataSource } from "../database/data-source";

export class TypeORMOrderRepository implements OrderRepository {
  private ormRepository: Repository<Order> = AppDataSource.getRepository(Order);

  async findById(id: string): Promise<Order | null> {
    const order = await this.ormRepository.findOne({ where: { id }});
    return order || null;
  }

  async findAll(): Promise<Order[]> {
    return this.ormRepository.find();
  }

  async save(order: Order): Promise<void> {
    await this.ormRepository.save(order);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
