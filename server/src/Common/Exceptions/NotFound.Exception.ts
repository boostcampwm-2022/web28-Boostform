import HttpException from "./Http.Exception";

export default class NotFoundException extends HttpException {
  constructor(message = "찾을 수 없습니다.") {
    super(404, message);
  }
}
