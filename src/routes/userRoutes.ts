import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { CreateUserSchema, UpdateUserSchema } from "../schemas/UserSchema";

const userRoutes = Router();
const userController = new UserController();

userRoutes
  .route("/")
  .get(userController.index)
  .post(validate(CreateUserSchema), userController.create);

userRoutes
  .route("/:id")
  .get(userController.show)
  .patch(validate(UpdateUserSchema), userController.update)
  .delete(userController.delete);

export { userRoutes };
