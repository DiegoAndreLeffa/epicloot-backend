import { Repository } from "typeorm";
import { User } from "../../domain/entities/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { AppDataSource } from "../database/data-source";

export class TypeORMUserRepository implements UserRepository {
  private ormRepository: Repository<User> = AppDataSource.getRepository(User);

  async findById(id: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { id }});
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user || null;
  }

  async save(user: User): Promise<void> {
    await this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
