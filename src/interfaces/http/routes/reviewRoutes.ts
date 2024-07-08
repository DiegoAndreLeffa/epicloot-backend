import { Router } from "express";
import { ReviewController } from "../../../application/controllers/ReviewController";
import { TypeORMReviewRepository } from "../../../infrastructure/repositories/TypeORMReviewRepository";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";
import { TypeORMProductRepository } from "../../../infrastructure/repositories/TypeORMProductRepository";
import { CreateReviewUseCase } from "../../../application/use-cases/review/CreateReviewUseCase";
import { GetReviewByIdUseCase } from "../../../application/use-cases/review/GetReviewByIdUseCase";
import { GetAllReviewsUseCase } from "../../../application/use-cases/review/GetAllReviewsUseCase";
import { UpdateReviewUseCase } from "../../../application/use-cases/review/UpdateReviewUseCase";
import { DeleteReviewUseCase } from "../../../application/use-cases/review/DeleteReviewUseCase";
import { validateSchema } from "../middleware/validateSchema";
import { createReviewSchema, updateReviewSchema } from "../schemas/reviewSchemas";


const router = Router();

const reviewRepository = new TypeORMReviewRepository();
const userRepository = new TypeORMUserRepository();
const productRepository = new TypeORMProductRepository();

const createReviewUseCase = new CreateReviewUseCase(reviewRepository, userRepository, productRepository);
const getReviewByIdUseCase = new GetReviewByIdUseCase(reviewRepository);
const getAllReviewsUseCase = new GetAllReviewsUseCase(reviewRepository);
const updateReviewUseCase = new UpdateReviewUseCase(reviewRepository);
const deleteReviewUseCase = new DeleteReviewUseCase(reviewRepository);

const reviewController = new ReviewController(
  createReviewUseCase,
  getReviewByIdUseCase,
  getAllReviewsUseCase,
  updateReviewUseCase,
  deleteReviewUseCase
);

router.post("/reviews", validateSchema(createReviewSchema), (req, res, next) => reviewController.create(req, res, next));
router.get("/reviews/:id", (req, res, next) => reviewController.getById(req, res, next));
router.get("/reviews", (req, res, next) => reviewController.getAll(req, res, next));
router.patch("/reviews/:id", validateSchema(updateReviewSchema), (req, res, next) => reviewController.update(req, res, next));
router.delete("/reviews/:id", (req, res, next) => reviewController.delete(req, res, next));

export default router;
