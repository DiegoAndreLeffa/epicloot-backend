import { Router } from "express";
import { OrderController } from "../../../application/controllers/OrderController";
import { TypeORMOrderRepository } from "../../../infrastructure/repositories/TypeORMOrderRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";
import { CreateOrderUseCase } from "../../../application/use-cases/order/CreateOrderUseCase";
import { GetOrderByIdUseCase } from "../../../application/use-cases/order/GetOrderByIdUseCase";
import { GetAllOrdersUseCase } from "../../../application/use-cases/order/GetAllOrdersUseCase";
import { UpdateOrderUseCase } from "../../../application/use-cases/order/UpdateOrderUseCase";
import { DeleteOrderUseCase } from "../../../application/use-cases/order/DeleteOrderUseCase";
import { validateSchema } from "../middleware/validateSchema";
import { createOrderSchema, updateOrderSchema } from "../schemas/orderSchemas";


const router = Router();

const orderRepository = new TypeORMOrderRepository();
const userRepository = new TypeORMUserRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository, userRepository);
const getOrderByIdUseCase = new GetOrderByIdUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const updateOrderUseCase = new UpdateOrderUseCase(orderRepository);
const deleteOrderUseCase = new DeleteOrderUseCase(orderRepository);

const orderController = new OrderController(
  createOrderUseCase,
  getOrderByIdUseCase,
  getAllOrdersUseCase,
  updateOrderUseCase,
  deleteOrderUseCase
);

router.post("/orders", validateSchema(createOrderSchema), (req, res, next) => orderController.create(req, res, next));
router.get("/orders/:id", (req, res, next) => orderController.getById(req, res, next));
router.get("/orders", (req, res, next) => orderController.getAll(req, res, next));
router.patch("/orders/:id", validateSchema(updateOrderSchema), (req, res, next) => orderController.update(req, res, next));
router.delete("/orders/:id", (req, res, next) => orderController.delete(req, res, next));

export default router;
