import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import * as dotenv from "dotenv";
import UnauthorizedException from "../Common/Exceptions/unauthorized.Exception";

dotenv.config();

const extractUserID = (token: string): number => {
  const decodedJWT = jwt.verify(token, process.env.JWTKEY || "");
  return Number((decodedJWT as JwtPayload).id);
};

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    next(new UnauthorizedException("로그인이 필요합니다."));
    return;
  }
  try {
    const user = extractUserID(accessToken);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // if(error.message === "jwt expired")
      // TODO: reissue api로 리다이렉트
      if (error.message === "invalid token") {
        // 클라이언트 쿠키 비우기
        // TODO: refresh rotate
        next(new UnauthorizedException("invalid token"));
      }
    }
  }
};

export default authMiddleware;
