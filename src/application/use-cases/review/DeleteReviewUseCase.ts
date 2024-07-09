import { ReviewRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

export class DeleteReviewUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(id: string): Promise<void> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    await this.reviewRepository.delete(id);
  }
}
