import { hash } from "bcryptjs";
import { HttpError } from "../../errors/HttpError";
import prisma from "../../prisma/prisma";

interface UpdateUserRequest {
  id: string;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export class UpdateUserService {
  async execute({ id, name, email, password }: UpdateUserRequest) {
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
}
