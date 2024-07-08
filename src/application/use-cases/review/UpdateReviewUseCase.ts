import { Review } from "../../../domain/entities/Review";
import { ReviewRepository } from "../../../domain/repositories/ReviewRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface UpdateReviewRequest {
  id: string;
  rating?: number;
  comment?: string;
}

export class UpdateReviewUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(request: UpdateReviewRequest): Promise<Review> {
    const { id, ...updateData } = request;

    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    Object.assign(review, updateData);
    await this.reviewRepository.save(review);
    return review;
  }
}
