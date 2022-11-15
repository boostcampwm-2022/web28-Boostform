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
      next();
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      next(new BadRequestException());
      return;
    }

    userService
      .login(code)
      .then((tokens) => {
        res
          .status(200)
          .cookie("accessToken", tokens.accessToken)
          .cookie("refreshToken", tokens.refreshToken)
          // TODO: 메인페이지로 리다이렉트하도록 주소 변경
          .redirect(process.env.ORIGIN_URL as string);
        next();
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new UserController();
