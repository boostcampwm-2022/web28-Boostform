import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import UnauthorizedException from "../Common/Exceptions/Unauthorized.Exception";
import tokens from "../User/types/tokens.inteface";
import UserModel from "../User/User.Model";
import InteranlServerException from "../Common/Exceptions/InternalServer.Exception";
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

// refresh 토큰 사용 중 발생하는 JWT 에러에 대한 핸들러
const refreshJWTErrorHandler = (err: JsonWebTokenError, refreshToken: string) => {
  if (err.message === "jwt expired") {
    const userID = decodeExpiredToken(refreshToken);
    userService.logout(userID);
    throw new UnauthorizedException("refreshToken Expired");
  }
  if (err.message === "invalid token") {
    throw new UnauthorizedException("refreshToken Invalid");
  }
};

// accessToken 과 refreshToken을 재발급
const reissueTokens = async (refreshToken: string): Promise<tokens> => {
  const reissuedTokens = { accessToken: "", refreshToken: "" };
  if (!refreshToken) {
    throw new UnauthorizedException("Empty refreshToken");
  }
  try {
    const userID = decodeToken(refreshToken);
    const targetUser = await UserModel.findOneByID(userID);
    if (!targetUser) {
      throw new InteranlServerException();
    }
    if (refreshToken !== targetUser.refresh_token) {
      userService.logout(userID);
      throw new UnauthorizedException("refreshToken Rotated");
    }
    reissuedTokens.accessToken = userService.generateToken(userID, "1m");
    reissuedTokens.refreshToken = userService.generateToken(userID, "2d");
    targetUser.refresh_token = reissuedTokens.refreshToken;
    targetUser.save();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      refreshJWTErrorHandler(err, refreshToken);
    } else throw err;
  }
  return reissuedTokens;
};

// accessToken 사용 중 발생하는 JWT 에러 핸들러
const accessJWTErrorHandler = async (err: JsonWebTokenError, req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;
  if (err.message === "jwt expired") {
    try {
      const reissuedTokens = await reissueTokens(refreshToken);
      res
        .cookie("accessToken", reissuedTokens.accessToken)
        .cookie("refreshToken", reissuedTokens.refreshToken, { httpOnly: true });
      req.userID = decodeToken(reissuedTokens.accessToken);
      next();
    } catch (reissueError) {
      res.clearCookie("accessToken").clearCookie("refreshToken");
      next(reissueError);
    }
  }
  if (err.message === "invalid token") {
    res.clearCookie("accessToken").clearCookie("refreshToken");
    next(new UnauthorizedException("invalid token"));
  }
};

// accessToken 으로 사용자 식별 실패하면 refreshToken으로 재발행
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    res.clearCookie("accessToken").clearCookie("refreshToken");
    next(new UnauthorizedException("Empty AccessToken"));
    return;
  }
  try {
    req.userID = decodeToken(accessToken);
    next();
  } catch (accessError) {
    if (accessError instanceof JsonWebTokenError) {
      accessJWTErrorHandler(accessError, req, res, next);
    } else {
      next(accessError);
    }
  }
};

const checkAccessTokenExistence = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    next(); // 로그인 하지 않은 경우
  } else {
    authMiddleware(req, res, next); // 로그인 한 경우
  }
};

export { authMiddleware, checkAccessTokenExistence };
