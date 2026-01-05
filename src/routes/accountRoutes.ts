import { Router } from "express";
import { AccontController } from "../controllers/AccountController";

const accountRoutes = Router();
const accountController = new AccontController();

accountRoutes
  .route("/")
  .get(accountController.index)
  .post(accountController.create);

accountRoutes
  .route("/:id")
  .get(accountController.show)
  .patch(accountController.update);

export { accountRoutes };
