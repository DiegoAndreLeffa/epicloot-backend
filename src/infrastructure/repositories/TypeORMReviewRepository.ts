import { Repository } from "typeorm";
import { Review } from "../../domain/entities/Review";
import { ReviewRepository } from "../../domain/repositories/ReviewRepository";
import { AppDataSource } from "../database/data-source";

export class TypeORMReviewRepository implements ReviewRepository {
  private ormRepository: Repository<Review> = AppDataSource.getRepository(Review);

  async findById(id: string): Promise<Review | null> {
    const review = await this.ormRepository.findOne({ where: { id }});
    return review || null;
  }

  async findAll(): Promise<Review[]> {
    return this.ormRepository.find();
  }

  async save(review: Review): Promise<void> {
    await this.ormRepository.save(review);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
