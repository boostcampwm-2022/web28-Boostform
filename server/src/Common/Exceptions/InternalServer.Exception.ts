// 서버 오류
import HttpException from "./Http.Exception";

export default class InteranServerException extends HttpException {
  constructor(message = "서버 오류") {
    super(500, message);
  }
}
