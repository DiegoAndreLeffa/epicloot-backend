import { Router } from "express";

import { UserController } from "../../../application/controllers/UserController";
import { TypeORMUserRepository } from "../../../infrastructure/repositories/TypeORMUserRepository";
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { GetUserByIdUseCase } from "../../../application/use-cases/user/GetUserByIdUseCase";
import { UpdateUserUseCase } from "../../../application/use-cases/user/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../application/use-cases/user/DeleteUserUseCase";
import { AuthenticateUserUseCase } from "../../../application/use-cases/user/AuthenticateUserUseCase";

import { validateSchema } from "../middleware/validateSchema";
import { registerUserSchema, updateUserSchema, authenticateUserSchema } from "../schemas/userSchemas";

const router = Router();

const userRepository = new TypeORMUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUserByIdUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  authenticateUserUseCase
);

router.post("/users", validateSchema(registerUserSchema), (req, res, next) => userController.register(req, res, next));
router.get("/users/:id", (req, res, next) => userController.getUser(req, res, next));
router.patch("/users/:id", validateSchema(updateUserSchema), (req, res, next) => userController.updateUser(req, res, next));
router.delete("/users/:id", (req, res, next) => userController.deleteUser(req, res, next));
router.post("/users/authenticate", validateSchema(authenticateUserSchema), (req, res, next) => userController.authenticateUser(req, res, next));

export default router;
