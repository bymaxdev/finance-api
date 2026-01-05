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

  create: Handler = async (req, res, next) => {
    const newAccount = await this.accountService.create(req.body);
    res.status(201).json(newAccount);
  };

  update: Handler = async (req, res, next) => {
    const { id } = req.params;
    const updateAccount = await this.accountService.update({ id, ...req.body });
    res.json(updateAccount);
  };
}
