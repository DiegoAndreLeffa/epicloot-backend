import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string().min(0, "Price must be a positive number"),
  categoryNames: z.array(z.string().min(1, "Category name is required")),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  link: z.string().optional(),
});

export const updateProductSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  price: z.string().min(0, "Price must be a positive number").optional(),
  categoryNames: z.array(z.string().min(1, "Category name is required")).optional(),
  coverImage: z.string().optional(),
  galleryImages: z.array(z.string()).optional(),
  link: z.string().optional(),
});
