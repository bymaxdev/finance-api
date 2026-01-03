import { Handler } from "express";
import prisma from "../prisma/prisma";
import { HttpError } from "../errors/HttpError";
import { CreateUserService } from "../services/user/CreateUserService";
import { UpdateUserService } from "../services/user/UpdateUserService";
import { DeleteUserService } from "../services/user/DeleteUserSevice";

export class UserController {
  index: Handler = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, isActive: true },
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
      });

      if (!user) {
        throw new HttpError(404, "ID não encontrado.");
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const createUser = new CreateUserService();

      const newUser = await createUser.execute({
        name,
        email,
        password,
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;

      const updateUser = new UpdateUserService();
      const updatedUser = await updateUser.execute({
        id,
        name,
        email,
        password,
      });

      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;

      const desactiveUser = new DeleteUserService();
      const desactivedUser = await desactiveUser.execute({
        id,
      });

      res.json(desactivedUser);
    } catch (error) {
      next(error);
    }
  };
}
