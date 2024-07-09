import { Router } from "express";
import { CartController } from "../../../application/controllers/CartController";
import { TypeORMCartRepository } from "../../../infrastructure/repositories/TypeORMCartRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";
import { TypeORMProductRepository } from "../../../infrastructure/repositories/TypeORMProductRepository";
import { CreateOrUpdateCartUseCase } from "../../../application/use-cases/cart/CreateOrUpdateCartUseCase";
import { GetCartByUserIdUseCase } from "../../../application/use-cases/cart/GetCartByUserIdUseCase";
import { RemoveItemFromCartUseCase } from "../../../application/use-cases/cart/RemoveItemFromCartUseCase";
import { validateSchema } from "../middleware/validateSchema";
import { createOrUpdateCartSchema, removeItemFromCartSchema } from "../schemas/cartSchemas";


const router = Router();

const cartRepository = new TypeORMCartRepository();
const userRepository = new TypeORMUserRepository();
const productRepository = new TypeORMProductRepository();

const createOrUpdateCartUseCase = new CreateOrUpdateCartUseCase(cartRepository, userRepository, productRepository);
const getCartByUserIdUseCase = new GetCartByUserIdUseCase(cartRepository);
const removeItemFromCartUseCase = new RemoveItemFromCartUseCase(cartRepository);

const cartController = new CartController(
  createOrUpdateCartUseCase,
  getCartByUserIdUseCase,
  removeItemFromCartUseCase
);

router.post("/carts", validateSchema(createOrUpdateCartSchema), (req, res, next) => cartController.createOrUpdate(req, res, next));
router.get("/carts/:userId", (req, res, next) => cartController.getByUserId(req, res, next));
router.delete("/carts/items", validateSchema(removeItemFromCartSchema), (req, res, next) => cartController.removeItem(req, res, next));

export default router;
