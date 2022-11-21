import { Request, Response, NextFunction } from "express";
import BoardService from "./Board.Service";

class BoardController {
  static getFormList(req: Request, res: Response, next: NextFunction) {
    res.send({ message: "Board API" });
  }

  // search : 제목에 검색어가 포함된 설문조사만 찾기 - 정규표현식

  // filter : 카테고리 필터링

  // sort : 제목, 응답자 수, 카테고리 순 정렬 기능
}

export default BoardController;
