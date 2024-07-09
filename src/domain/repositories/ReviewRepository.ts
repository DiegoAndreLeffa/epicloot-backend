import { Review } from "../entities";

export interface ReviewRepository {
  findById(id: string): Promise<Review | null>;
  findAll(): Promise<Review[]>;
  save(review: Review): Promise<void>;
  delete(id: string): Promise<void>;
}
