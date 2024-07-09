import { Review } from "../../../domain/entities";
import { ReviewRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class GetReviewByIdUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(id: string): Promise<Review | null> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }
    return review;
  }
}
