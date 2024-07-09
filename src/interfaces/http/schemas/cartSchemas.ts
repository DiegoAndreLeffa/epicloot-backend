import { z } from "zod";

export const createOrUpdateCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  productIds: z.array(z.string().uuid("Invalid product ID"))
});

export const removeItemFromCartSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  productId: z.string().uuid("Invalid product ID"),
});
