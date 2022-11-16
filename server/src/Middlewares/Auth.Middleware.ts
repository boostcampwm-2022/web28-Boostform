import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import UnauthorizedException from "../Common/Exceptions/Unauthorized.Exception";
import tokens from "../User/types/tokens.inteface";
import UserModel from "../User/User.Model";
import InteranServerException from "../Common/Exceptions/InternalServer.Exception";
import userService from "../User/User.Service";

dotenv.config();

const decodeToken = (token: string): number => {
  const decodedJWT = jwt.verify(token, process.env.JWTKEY || "");
  return Number((decodedJWT as JwtPayload).id);
};

const decodeExpiredToken = (token: string): number => {
  const decodedJWT = jwt.verify(token, process.env.JWTKEY || "", { ignoreExpiration: true });
  return Number((decodedJWT as JwtPayload).id);
};

const reissueTokens = async (refreshToken: string): Promise<tokens | undefined> => {
  const reissuedTokens = { accessToken: "", refreshToken: "" };
  if (!refreshToken) {
    throw new UnauthorizedException();
  }
  try {
    const userID = decodeToken(refreshToken);
    const targetUser = await UserModel.findOneByID(userID);
    if (!targetUser) {
      throw new InteranServerException();
    }
    // db의 리프레시토큰과 일치하지 않으면 로그아웃 처리(서버만)
    if (refreshToken !== targetUser.refresh_token) {
      targetUser.refresh_token = undefined;
      targetUser.save();
      return undefined;
    }
    reissuedTokens.accessToken = userService.generateToken(userID, "1m");
    reissuedTokens.refreshToken = userService.generateToken(userID, "7d");
    targetUser.refresh_token = reissuedTokens.refreshToken;
    targetUser.save();
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // refresh 토큰 만료시 로그아웃 처리 (서버만)
      if (error.message === "jwt expired") {
        const userID = decodeExpiredToken(refreshToken);
        const targetUser = await UserModel.findOneByID(userID);
        if (!targetUser) {
          throw new InteranServerException();
        }
        targetUser.refresh_token = undefined;
        targetUser.save();
        return undefined;
      }
      // refresh 토큰 유효하지 않을 시 에러 던짐
      if (error.message === "invalid token") {
        throw new UnauthorizedException();
      }
    }
  }
  return reissuedTokens;
};

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;
  console.log(accessToken);
  console.log(refreshToken);
  // accessToken없으면 로그인으로 리다이렉트
  if (!accessToken) {
    // 임시 에러처리
    // next(new UnauthorizedException("로그인이 필요합니다."));
    // 리다이렉트 처리
    res
      .status(401)
      .clearCookie("accessToken")
      .clearCookie("refreshToken")
      .redirect(process.env.ORIGIN_URL as string);
    return;
  }

  try {
    req.userID = decodeToken(accessToken);
    next();
  } catch (authError) {
    if (authError instanceof JsonWebTokenError) {
      // access 토큰 만료시 reissue 수행
      if (authError.message === "jwt expired") {
        try {
          const reissuedTokens = await reissueTokens(refreshToken);
          if (!reissuedTokens) {
            res
              .status(401)
              .clearCookie("accessToken")
              .clearCookie("refreshToken")
              .redirect(process.env.ORIGIN_URL as string);
            return;
          }
          res.cookie("accessToken", reissuedTokens.accessToken).cookie("refreshToken", reissuedTokens.refreshToken);
          req.userID = decodeToken(reissuedTokens.accessToken);
          next();
        } catch (reissueError) {
          next(reissueError);
        }
      }
      // access 토큰 유효하지 않을 시 에러 던짐
      if (authError.message === "invalid token") {
        res.clearCookie("accessToken").clearCookie("refreshToken");
        next(new UnauthorizedException("invalid token"));
      }
    } else {
      next(authError);
    }
  }
};
export default authMiddleware;
