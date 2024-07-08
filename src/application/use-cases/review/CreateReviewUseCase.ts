import { Review } from "../../../domain/entities/Review";
import { ReviewRepository } from "../../../domain/repositories/ReviewRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ProductRepository } from "../../../domain/repositories/ProductRepository";
import { AppError } from "../../../interfaces/http/middleware/errors";

interface CreateReviewRequest {
  userId: string;
  productId: string;
  rating: number;
  comment: string;
}

export class CreateReviewUseCase {
  constructor(
    private reviewRepository: ReviewRepository,
    private userRepository: UserRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(request: CreateReviewRequest): Promise<Review> {
    const { userId, productId, rating, comment } = request;

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const product = await this.productRepository.findById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const review = new Review();
    review.user = user;
    review.product = product;
    review.rating = rating;
    review.comment = comment;
    review.date = new Date();

    await this.reviewRepository.save(review);
    return review;
  }
}
