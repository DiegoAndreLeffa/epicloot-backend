import { Router } from "express";

import { validateSchema } from "./middleware/validateSchema";
import { createProductSchema, updateProductSchema } from "./schemas/productSchemas";

import { ProductController } from "../../application/controllers/ProductController";
import { ProductService } from "../../domain/services/ProductService";
import { TypeORMProductRepository } from "../../infrastructure/repositories/TypeORMProductRepository";

const router = Router();

const productRepository = new TypeORMProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

router.post("/products", validateSchema(createProductSchema), (req, res, next) => productController.create(req, res, next));
router.get("/products/:id", (req, res, next) => productController.getById(req, res, next));
router.get("/products", (req, res, next) => productController.getAll(req, res, next));
router.patch("/products/:id", validateSchema(updateProductSchema), (req, res, next) => productController.update(req, res, next));
router.delete("/products/:id", (req, res, next) => productController.delete(req, res, next));

export default router;
