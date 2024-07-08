import { Router } from "express";

import { TypeORMUserRepository } from "../../infrastructure/repositories/TypeORMUserRepository";
import { UserController } from "../../application/controllers/UserController";
import { UserService } from "../../domain/services/UserService";
import { validateSchema } from "./middleware/validateSchema";
import { registerUserSchema, updateUserSchema, authenticateUserSchema } from "./schemas/userSchemas";


const router = Router();

const userRepository = new TypeORMUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/users", validateSchema(registerUserSchema), (req, res, next) => userController.register(req, res, next));
router.get("/users/:id", (req, res, next) => userController.getUser(req, res, next));
router.patch("/users/:id", validateSchema(updateUserSchema), (req, res, next) => userController.updateUser(req, res, next));
router.delete("/users/:id", (req, res, next) => userController.deleteUser(req, res, next));

router.post("/users/authenticate", validateSchema(authenticateUserSchema), (req, res, next) => userController.authenticateUser(req, res, next));

export default router;
