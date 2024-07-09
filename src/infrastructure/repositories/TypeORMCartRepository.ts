import { Repository } from "typeorm";
import { Cart } from "../../domain/entities/Cart";
import { CartRepository } from "../../domain/repositories/CartRepository";
import { AppDataSource } from "../database/data-source";

export class TypeORMCartRepository implements CartRepository {
  private ormRepository: Repository<Cart> = AppDataSource.getRepository(Cart);

  async findById(id: string): Promise<Cart | null> {
    return await this.ormRepository.findOne({ where: { id }, relations: ["items"] });
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    return await this.ormRepository.findOne({ where: { user: { id: userId } }, relations: ["items"] });
  }

  async findAll(): Promise<Cart[]> {
    return this.ormRepository.find({ relations: ["items"] });
  }

  async save(cart: Cart): Promise<void> {
    await this.ormRepository.save(cart);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
