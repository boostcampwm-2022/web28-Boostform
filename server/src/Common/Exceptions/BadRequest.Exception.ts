// 사용자의 요청 형식이 잘못된 경우
import HttpException from "./Http.Exception";

export default class BadRequestException extends HttpException {
  constructor(message = "잘못된 요청입니다.") {
    super(400, message);
  }
}
