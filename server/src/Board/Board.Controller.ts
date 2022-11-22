import { Request, Response, NextFunction } from "express";
import BoardService from "./Board.Service";

class BoardController {
  static filterByKeys(query: any, keys: string[]) {
    const queryList = Object.entries(query).filter(([k, v]) => keys.includes(k));
    const queryObject = Object.fromEntries(queryList);
    return queryObject;
  }

  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const searchKeys = ["title", "category"];
    const sortKeys = ["order_by", "order"];
    const searchQuery = BoardController.filterByKeys(req.query, searchKeys);
    const sortQuery = BoardController.filterByKeys(req.query, sortKeys);

    const searchResult = await BoardService.searchByQuery(searchQuery, sortQuery);
    res.send(searchResult);
  }
}

export default BoardController;
