import { Handler } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  index: Handler = async (req, res, next) => {
    const users = await this.userService.list();
    res.json(users);
  };

  show: Handler = async (req, res, next) => {
    const { id } = req.params;
    const userById = await this.userService.findById(id);
    res.json(userById);
  };

  create: Handler = async (req, res, next) => {
    const newUser = await this.userService.create(req.body);
    res.status(201).json(newUser);
  };

  update: Handler = async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = await this.userService.update({ id, ...req.body });
    res.json(updatedUser);
  };

  delete: Handler = async (req, res, next) => {
    const { id } = req.params;
    const desactivedUser = await this.userService.delete(id);
    res.json(desactivedUser);
  };

  //Eliminação de Try/Catch por conta da versão do express ser 5.2
}
