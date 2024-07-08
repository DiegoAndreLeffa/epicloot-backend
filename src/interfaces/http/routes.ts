import { Router } from "express";

import { TypeORMUserRepository } from "../../infrastructure/repositories/TypeORMUserRepository";
import { UserService } from "../../domain/services/UserService";
import { UserController } from "../../application/controllers/UserController";

const router = Router();

const userRepository = new TypeORMUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.post("/users", (req, res, next) => userController.register(req, res, next));
router.get("/users/:id", (req, res, next) => userController.getUser(req, res, next));
router.put("/users/:id", (req, res, next) => userController.updateUser(req, res, next));
router.delete("/users/:id", (req, res, next) => userController.deleteUser(req, res, next));
router.post("/users/authenticate", (req, res, next) => userController.authenticateUser(req, res, next));


export default router;