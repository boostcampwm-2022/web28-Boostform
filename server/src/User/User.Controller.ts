/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import userService from "./User.Service";

dotenv.config();
class UserController {
  redirect(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(301).redirect(userService.redirectURL);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      throw new BadRequestException();
    }
    userService
      .login(code)
      .then((tokens) => {
        res
          .status(200)
          .cookie("accessToken", tokens.accessToken)
          .cookie("refreshToken", tokens.refreshToken)
          .redirect(process.env.ORIGIN_URL as string);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new UserController();
