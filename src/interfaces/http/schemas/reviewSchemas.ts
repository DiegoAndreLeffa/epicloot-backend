import { z } from "zod";

export const createReviewSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  productId: z.string().uuid("Invalid product ID"),
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  comment: z.string().min(1, "Comment is required"),
});

export const updateReviewSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
  comment: z.string().min(1, "Comment is required").optional(),
});
