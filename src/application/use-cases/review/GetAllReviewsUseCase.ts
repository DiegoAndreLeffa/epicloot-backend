import { Review } from "../../../domain/entities/Review";
import { ReviewRepository } from "../../../domain/repositories/ReviewRepository";

export class GetAllReviewsUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }
}
