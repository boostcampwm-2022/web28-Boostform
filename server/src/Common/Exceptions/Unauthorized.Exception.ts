// 인증 실패에 대한 오류
import HttpException from "./Http.Exception";

export default class UnauthorizedException extends HttpException {
  constructor(message = "인증 자격 증명이 유효하지 않습니다.") {
    super(401, message);
  }
}
