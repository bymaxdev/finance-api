import { Handler } from "express";
import { AccountService } from "../services/AccountService";

export class AccontController {
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
  }

  index: Handler = async (req, res, next) => {
    const accounts = await this.accountService.list();
    res.json(accounts);
  };

  show: Handler = async (req, res, next) => {
    const { id } = req.params;
    const accountById = await this.accountService.findById(id);
    res.json(accountById);
  };
}
