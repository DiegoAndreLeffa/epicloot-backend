import { Router } from "express";
import { ProductController } from "../../../application/controllers";
import { CreateProductUseCase, GetProductByIdUseCase, GetAllProductsUseCase, UpdateProductUseCase, DeleteProductUseCase } from "../../../application/use-cases/product";
import { upload } from "../../../config/cloudinaryConfig";
import { TypeORMProductRepository, TypeORMCategoryRepository } from "../../../infrastructure/repositories";
import { authenticate } from "../middleware/auth";
import { checkAdmin } from "../middleware/checkAdmin";
import { validateSchema } from "../middleware/validateSchema";
import { createProductSchema, updateProductSchema } from "../schemas/productSchemas";

const router = Router();

const productRepository = new TypeORMProductRepository();
const categoryRepository = new TypeORMCategoryRepository();

const createProductUseCase = new CreateProductUseCase(productRepository, categoryRepository);
const getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);
const updateProductUseCase = new UpdateProductUseCase(productRepository, categoryRepository);
const deleteProductUseCase = new DeleteProductUseCase(productRepository);

const productController = new ProductController(
  createProductUseCase,
  getProductByIdUseCase,
  getAllProductsUseCase,
  updateProductUseCase,
  deleteProductUseCase
);

router.post(
  '/products',
  authenticate,
  checkAdmin,
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 5 }]),
  validateSchema(createProductSchema),
  (req, res, next) => productController.create(req, res, next)
);
router.get('/products/:id', (req, res, next) => productController.getById(req, res, next));
router.get('/products', (req, res, next) => productController.getAll(req, res, next));
router.patch(
  '/update/:id',
  authenticate,
  checkAdmin,
  upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'galleryImages', maxCount: 5 }]),
  validateSchema(updateProductSchema),
  (req, res, next) => productController.update(req, res, next)
);
router.delete('/products/:id', authenticate, checkAdmin, (req, res, next) => productController.delete(req, res, next));

export default router;
