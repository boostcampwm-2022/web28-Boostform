import { Request, Response, NextFunction } from "express";
import userService from "./User.Service";

type UserService = typeof userService;

class UserController {
  #userService: UserService;

  constructor(service: UserService) {
    this.#userService = service;
  }

  redirect(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(301).redirect(this.#userService.redirectURL);
    } catch (error) {
      next(error);
    }
  }

  // async login(req: Request, res: Response, next: NextFunction) {
  //   const { code } = req.query;
  //   if (!code || typeof code !== "string") {
  //     throw new Error("invalid authorization code");
  //   }
  //   this.#userService
  //     .login(code)
  //     .then((tokens) => {
  //       res.status(200).cookie("accessToken", tokens.accessToken).cookie("refreshToken", tokens.refreshToken);
  //     })
  //     .catch((err) => {
  //       next(err);
  //     });
  // }
}

export default new UserController(userService);
