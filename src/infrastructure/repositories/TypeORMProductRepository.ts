import { Repository } from "typeorm";

import { Product } from "../../domain/entities";
import { ProductRepository } from "../../domain/repositories";

import { AppDataSource } from "../database/data-source";

export class TypeORMProductRepository implements ProductRepository {
  private ormRepository: Repository<Product> = AppDataSource.getRepository(Product);

  async findById(id: string): Promise<Product | null> {
    const product = await this.ormRepository.findOne({ where: { id }});
    return product || null;
  }

  async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }

  async save(product: Product): Promise<void> {
    await this.ormRepository.save(product);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
