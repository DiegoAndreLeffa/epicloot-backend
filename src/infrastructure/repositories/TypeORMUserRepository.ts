import { Repository } from "typeorm";

import { User } from "../../domain/entities";
import { UserRepository } from "../../domain/repositories";

import { AppDataSource } from "../database/data-source";

export class TypeORMUserRepository implements UserRepository {
  private ormRepository: Repository<User> = AppDataSource.getRepository(User);

  async findById(id: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { id }, relations: ["carts", "payments", "meusItens"] });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.ormRepository.findOne({ where: { email }, relations: ["carts", "payments", "meusItens"] });
  }

  async findAll(): Promise<User[]> {
    return this.ormRepository.find({ relations: ["carts", "payments", "meusItens"] });
  }

  async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
