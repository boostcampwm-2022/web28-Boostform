import { Request, Response, NextFunction } from "express";
import BoardService from "./Board.Service";

class BoardController {
  static filterByKeys(reqQuery: any, keys: string[]) {
    const queryList = Object.entries(reqQuery).filter(([k, v]) => keys.includes(k));
    const query = Object.fromEntries(queryList);
    return query;
  }

  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const searchKeys = ["title", "category"];
    const sortKeys = ["order_by", "order"];
    const searchQuery = BoardController.filterByKeys(req.query, searchKeys);
    const sortQuery = BoardController.filterByKeys(req.query, sortKeys);

    const searchResult = await BoardService.searchByQuery(searchQuery, sortQuery);
    res.status(200).send(searchResult);
  }
}

export default BoardController;
