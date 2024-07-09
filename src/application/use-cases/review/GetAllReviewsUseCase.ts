import { Review } from "../../../domain/entities";
import { ReviewRepository } from "../../../domain/repositories";

export class GetAllReviewsUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(): Promise<Review[]> {
    return this.reviewRepository.findAll();
  }
}
