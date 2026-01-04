import { HttpError } from "../errors/HttpError";
import prisma from "../prisma/prisma";

export class AccountService {
  async list() {
    const accounts = await prisma.account.findMany({
      select: { id: true, name: true, bank: true, user: true },
    });
    return accounts;
  }

  async findById(id: string) {
    const account = await prisma.account.findUnique({
      where: { id },
      select: { id: true, name: true, bank: true, user: true },
    });

    if (!account) {
      throw new HttpError(404, "ID não encontrado.");
    }

    return account;
  }
}
