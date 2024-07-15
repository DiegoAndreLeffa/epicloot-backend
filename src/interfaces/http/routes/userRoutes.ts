import { Router } from "express";

import { UserController } from "../../../application/controllers";

import { 
    CreateUserUseCase, 
    GetUserByIdUseCase, 
    GetAllUsersUseCase, 
    UpdateUserUseCase, 
    DeleteUserUseCase, 
    AuthenticatedUseCase 
} from "../../../application/use-cases/user";
import { TypeORMUserRepository } from "../../../infrastructure/repositories";

import { authenticate } from "../middleware/auth";
import { checkUser } from "../middleware/checkUser";
import { validateSchema } from "../middleware/validateSchema";
import { 
    createUserSchema, 
    authenticateUserSchema, 
    updateUserSchema 
} from "../schemas/userSchemas";
import { checkAdmin } from "../middleware/checkAdmin";

const router = Router();

const userRepository = new TypeORMUserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const authenticatedUseCase = new AuthenticatedUseCase(userRepository);

const userController = new UserController(
  createUserUseCase,
  getUserByIdUseCase,
  getAllUsersUseCase,
  updateUserUseCase,
  deleteUserUseCase,
  authenticatedUseCase
);

router.post("/users", validateSchema(createUserSchema), (req, res, next) => userController.create(req, res, next));
router.post("/users/authenticate", validateSchema(authenticateUserSchema), (req, res, next) => userController.authenticate(req, res, next));
router.get("/allusers", authenticate, checkAdmin, (req, res, next) => userController.getAll(res, next));
router.get("/users/:id", authenticate, checkUser, (req, res, next) => userController.getById(req, res, next));
router.patch("/users/:id", authenticate, checkUser, validateSchema(updateUserSchema), (req, res, next) => userController.update(req, res, next));
router.delete("/users/:id", authenticate, checkUser, (req, res, next) => userController.delete(req, res, next));

export default router;
