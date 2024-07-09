import { Router } from "express";

import { validateSchema } from "../middleware/validateSchema";
import { createProductSchema, updateProductSchema } from "../schemas/productSchemas";

import { ProductController } from "../../../application/controllers";
import { 
    CreateProductUseCase, 
    GetProductByIdUseCase, 
    GetAllProductsUseCase, 
    UpdateProductUseCase, 
    DeleteProductUseCase 
} from "../../../application/use-cases/product";
import { 
    TypeORMProductRepository, 
    TypeORMCategoryRepository 
} from "../../../infrastructure/repositories";

const router = Router();

const productRepository = new TypeORMProductRepository();
const categoryRepository = new TypeORMCategoryRepository();

const createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const productController = new ProductController(
  createProductUseCase,
  getProductByIdUseCase,
  getAllProductsUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

router.post("/products", validateSchema(createProductSchema), (req, res, next) => productController.create(req, res, next));
router.get("/products/:id", (req, res, next) => productController.getById(req, res, next));
router.get("/products", (req, res, next) => productController.getAll(req, res, next));
router.patch("/products/:id", validateSchema(updateProductSchema), (req, res, next) => productController.update(req, res, next));
router.delete("/products/:id", (req, res, next) => productController.delete(req, res, next));

export default router;
