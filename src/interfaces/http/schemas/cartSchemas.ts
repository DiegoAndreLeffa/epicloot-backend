import { z } from "zod";

export const createOrUpdateCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  productIds: z.array(z.string().uuid("Invalid product ID"))
});

export const removeCartItemSchema = z.object({
  productId: z.string().uuid("Invalid product ID format"),
});