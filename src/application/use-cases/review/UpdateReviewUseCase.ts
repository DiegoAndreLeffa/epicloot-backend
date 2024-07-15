import { Review } from "../../../domain/entities";
import { ReviewRepository } from "../../../domain/repositories";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface UpdateReviewRequest {
  id: string;
  rating?: number;
  comment?: string;
}

export class UpdateReviewUseCase {
  constructor(private reviewRepository: ReviewRepository) {}

  async execute(request: UpdateReviewRequest): Promise<Review> {
    const { id, rating, comment } = request;

    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError("Review not found", 404);
    }

    if (rating !== undefined) {
      review.rating = rating;
    }

    if (comment !== undefined) {
      review.comment = comment;
    }

    review.date = new Date();

    await this.reviewRepository.save(review);

    return review;
  }
}
