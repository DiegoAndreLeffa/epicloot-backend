import { Repository } from "typeorm";

import { Category } from "../../domain/entities";
import { CategoryRepository } from "../../domain/repositories";

import { AppDataSource } from "../database/data-source";

export class TypeORMCategoryRepository implements CategoryRepository {
  private ormRepository: Repository<Category> = AppDataSource.getRepository(Category);

  async findByName(name: string): Promise<Category | null> {
    return await this.ormRepository.findOne({ where: { name } });
  }

  async save(category: Category): Promise<void> {
    await this.ormRepository.save(category);
  }
}
