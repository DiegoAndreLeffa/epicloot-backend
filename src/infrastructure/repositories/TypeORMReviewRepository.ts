import { Repository } from "typeorm";

import { Review } from "../../domain/entities";
import { ReviewRepository } from "../../domain/repositories";

import { AppDataSource } from "../database/data-source";

export class TypeORMReviewRepository implements ReviewRepository {
  private ormRepository: Repository<Review> = AppDataSource.getRepository(Review);

  async findById(id: string): Promise<Review | null> {
    return await this.ormRepository.findOne({ 
      where: { id },
      relations: ["user", "product"]
    });
  }

  async findAll(): Promise<Review[]> {
    return this.ormRepository.find({ 
      relations: ["user", "product"]
    });
  }

  async save(review: Review): Promise<void> {
    await this.ormRepository.save(review);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
