import { Router } from "express";

import { validateSchema } from "../middleware/validateSchema";
import { createReviewSchema, updateReviewSchema } from "../schemas/reviewSchemas";

import { ReviewController } from "../../../application/controllers";
import { 
  CreateReviewUseCase, 
  GetReviewByIdUseCase, 
  GetAllReviewsUseCase, 
  UpdateReviewUseCase, 
  DeleteReviewUseCase 
} from "../../../application/use-cases/review";
import { 
  TypeORMReviewRepository, 
  TypeORMUserRepository, 
  TypeORMProductRepository 
} from "../../../infrastructure/repositories";

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
