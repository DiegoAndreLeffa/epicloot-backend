import { Router } from "express";

import { validateSchema } from "../middleware/validateSchema";
import { createPaymentSchema } from "../schemas/paymentSchemas";

import { PaymentController } from "../../../application/controllers";
import { 
  CreatePaymentUseCase, 
  GetPaymentByIdUseCase, 
  GetAllPaymentsUseCase, 
  DeletePaymentUseCase 
} from "../../../application/use-cases/payment";
import { 
  TypeORMPaymentRepository, 
  TypeORMCartRepository, 
  TypeORMUserRepository 
} from "../../../infrastructure/repositories";

const router = Router();

const paymentRepository = new TypeORMPaymentRepository();
const cartRepository = new TypeORMCartRepository();
const userRepository = new TypeORMUserRepository();

const createPaymentUseCase = new CreatePaymentUseCase(paymentRepository, cartRepository, userRepository);
const getPaymentByIdUseCase = new GetPaymentByIdUseCase(paymentRepository);
const getAllPaymentsUseCase = new GetAllPaymentsUseCase(paymentRepository);
const deletePaymentUseCase = new DeletePaymentUseCase(paymentRepository);

const paymentController = new PaymentController(
  createPaymentUseCase,
  getPaymentByIdUseCase,
  getAllPaymentsUseCase,
  deletePaymentUseCase
);

router.post("/payments", validateSchema(createPaymentSchema), (req, res, next) => paymentController.create(req, res, next));
router.get("/payments/:id", (req, res, next) => paymentController.getById(req, res, next));
router.get("/payments", (req, res, next) => paymentController.getAll(req, res, next));
router.delete("/payments/:id", (req, res, next) => paymentController.delete(req, res, next));

export default router;
