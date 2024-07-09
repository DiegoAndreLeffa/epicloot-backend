import { Router } from "express";

import { validateSchema } from "../middleware/validateSchema";
import { 
  createOrUpdateCartSchema, 
  removeItemFromCartSchema 
} from "../schemas/cartSchemas";

import { CartController } from "../../../application/controllers";
import { 
  CreateOrUpdateCartUseCase, 
  GetCartByUserIdUseCase, 
  RemoveItemFromCartUseCase 
} from "../../../application/use-cases/cart";
import { 
  TypeORMCartRepository, 
  TypeORMUserRepository, 
  TypeORMProductRepository 
} from "../../../infrastructure/repositories";

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
