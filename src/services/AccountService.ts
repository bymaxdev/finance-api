import { HttpError } from "../errors/HttpError";
import prisma from "../prisma/prisma";
import {
  CreateAccountSchema,
  UpdateAccountSchema,
} from "../schemas/AccountSchema";

export class AccountService {
  async list() {
    const accounts = await prisma.account.findMany({
      select: { id: true, name: true, bank: true, balance: true, userId: true },
    });
    return accounts;
  }

  async findById(id: string) {
    const account = await prisma.account.findUnique({
      where: { id },
      select: { id: true, name: true, bank: true, balance: true, userId: true },
    });

    if (!account) {
      throw new HttpError(404, "ID não encontrado.");
    }

    return account;
  }

  async create({ name, bank, balance, userId }: CreateAccountSchema) {
    const account = await prisma.account.create({
      data: { name, bank, balance, userId },
      select: { id: true, name: true, bank: true, balance: true, userId: true },
    });
    return account;
  }

  async update({ id, name, bank, balance, userId }: UpdateAccountSchema) {
    const updateAccount = await prisma.account.update({
      where: { id },
      data: { name, bank, balance, userId },
      select: { id: true, name: true, bank: true, balance: true, userId: true },
    });

    return updateAccount;
  }
}
