import { Router } from "express";

import { validateSchema } from "../middleware/validateSchema";
import { createUserSchema, updateUserSchema } from "../schemas/userSchemas";

import { UserController } from "../../../application/controllers";
import { 
    CreateUserUseCase, 
    GetUserByIdUseCase, 
    UpdateUserUseCase, 
    DeleteUserUseCase 
} from "../../../application/use-cases/user";
import { TypeORMUserRepository } from "../../../infrastructure/repositories";

const router = Router();

const userRepository = new TypeORMUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase
);

router.post("/users", validateSchema(createUserSchema), (req, res, next) => userController.create(req, res, next));
router.get("/users/:id", (req, res, next) => userController.getById(req, res, next));
router.patch("/users/:id", validateSchema(updateUserSchema), (req, res, next) => userController.update(req, res, next));
router.delete("/users/:id", (req, res, next) => userController.delete(req, res, next));

export default router;
