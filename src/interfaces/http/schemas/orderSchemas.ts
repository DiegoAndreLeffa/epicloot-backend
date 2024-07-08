import { z } from "zod";

export const createOrderSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  status: z.string().min(1, "Status is required"),
  paymentId: z.string().uuid("Invalid payment ID"),
});

export const updateOrderSchema = z.object({
  status: z.string().min(1, "Status is required").optional(),
  paymentId: z.string().uuid("Invalid payment ID").optional(),
});
