import { HttpError } from "../../errors/HttpError";
import prisma from "../../prisma/prisma";

interface DeleteUserRequest {
  id: string;
}

export class DeleteUserService {
  async execute({ id }: DeleteUserRequest) {
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
