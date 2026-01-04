import { Handler } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  index: Handler = async (req, res, next) => {
    try {
      const users = await this.userService.list();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };

  show: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const findById = await this.userService.findById(id);
      res.json(findById);
    } catch (error) {
      next(error);
    }
  };

  create: Handler = async (req, res, next) => {
    try {
      const newUser = await this.userService.create(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUser = await this.userService.update({ id, ...req.body });
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const desactivedUser = await this.userService.delete(id);
      res.json(desactivedUser);
    } catch (error) {
      next(error);
    }
  };
}
