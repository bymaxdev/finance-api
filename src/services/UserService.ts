import { hash } from "bcryptjs";
import { HttpError } from "../errors/HttpError";
import prisma from "../prisma/prisma";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserRequest {
  id: string;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export class UserService {
  async list() {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, isActive: true },
    });
    return users;
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, isActive: true },
    });

    if (!user) {
      throw new HttpError(404, "ID não encontrado.");
    }

    return user;
  }

  async create({ name, email, password }: CreateUserRequest) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new HttpError(400, "User already exists.");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
      },
    });

    return user;
  }

  async update({ id, name, email, password }: UpdateUserRequest) {
    const userAlreadyExists = await prisma.user.findUnique({ where: { id } });

    if (!userAlreadyExists) {
      throw new HttpError(404, "Este ID não existe.");
    }

    if (email && email !== userAlreadyExists.email) {
      const emailExists = await prisma.user.findUnique({ where: { email } });
      if (emailExists) {
        throw new HttpError(400, "Este email já existe.");
      }
    }

    let passwordHash;
    if (password) {
      passwordHash = await hash(password, 8);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, password: passwordHash || undefined },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updatedUser;
  }

  async delete(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpError(404, "ID não encontrado.");
    }

    if (user.active === false) {
      throw new HttpError(400, "Este usuário já está desativado.");
    }

    const desactiveUser = await prisma.user.update({
      where: { id },
      data: { isActive: false },
      select: {
        id: true,
        name: true,
        email: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return desactiveUser;
  }
}
