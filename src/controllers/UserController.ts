import { Handler } from "express";
import { hash } from "bcryptjs";
import prisma from "../prisma/prisma";
import { HttpError } from "../errors/HttpError";

export class UserController {
  index: Handler = async (req, res, next) => {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true },
      });
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const userExists = await prisma.user.findUnique({ where: { email } });

      if (userExists) {
        throw new HttpError(400, "Este email já está em uso.");
      }

      const passwordHash = await hash(password, 8);

      const newUser = await prisma.user.create({
        data: { name, email, password: passwordHash },
        select: { id: true, name: true, email: true, createdAt: true },
      });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };
}
