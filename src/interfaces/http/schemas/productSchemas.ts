import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be a positive number"),
  categoryName: z.string().min(1, "Category name is required"),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.number().min(0, "Price must be a positive number").optional(),
  categoryName: z.string().min(1, "Category name is required").optional(),
});
