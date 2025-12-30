import { Router } from "express";
import { HttpError } from "../errors/HttpError";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { CreateUserSchema } from "../controllers/schemas/UserSchema";

const router = Router();
const userController = new UserController();

router.get("/users", userController.index);
router.post("/users", validate(CreateUserSchema), userController.create);

export { router };
