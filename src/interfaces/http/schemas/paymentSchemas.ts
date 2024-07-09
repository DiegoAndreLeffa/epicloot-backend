import { z } from "zod";

export const createPaymentSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  type: z.string().min(1, "Type is required"),
  amount: z.number().min(0, "Amount must be a positive number"),
});
