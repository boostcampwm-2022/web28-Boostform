// 인가 실패에 대한 오류
import HttpException from "./Http.Exception";

export default class ForbiddenException extends HttpException {
  constructor(message = "접근 권한이 없습니다.") {
    super(403, message);
  }
}
