/* eslint-disable class-methods-use-this */
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import userService from "./User.Service";
import InteranServerException from "../Common/Exceptions/InternalServer.Exception";

dotenv.config();
class UserController {
  redirect(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(301).redirect(userService.redirectURL);
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
          .cookie("refreshToken", tokens.refreshToken, { httpOnly: true })
          .redirect(`${process.env.ORIGIN_URL as string}/myForms`);
      })
      .catch((err) => {
        next(err);
      });
  }

  async userInfo(req: Request, res: Response, next: NextFunction) {
    const { userID } = req;
    if (!userID) {
      next(new InteranServerException("인증 미들웨어 오류"));
      return;
    }
    userService
      .userInfo(userID)
      .then((userInfo) => {
        res.status(200).json(userInfo);
      })
      .catch((err) => {
        next(err);
      });
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    const { userID } = req;
    if (!userID) {
      next(new InteranServerException("인증 미들웨어 오류"));
      return;
    }
    userService
      .logout(userID)
      .then(() => {
        res.status(204).clearCookie("accessToken").clearCookie("refreshToken").end();
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default new UserController();
