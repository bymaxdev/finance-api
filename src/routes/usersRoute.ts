import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { UserSchema } from "../controllers/schemas/UserSchema";

const router = Router();
const userController = new UserController();

router.get("/users", userController.index);
router.get("/users/:id", userController.show);
router.post("/users", validate(UserSchema), userController.create);
router.patch("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

export { router };
