import { Request, Response, NextFunction } from "express";
import BoardService from "./Board.Service";
import { redisCli } from "../app";

class BoardController {
  static filterByKeys(reqQuery: any, keys: string[]) {
    const queryList = Object.entries(reqQuery).filter(([k, v]) => keys.includes(k));
    const query = Object.fromEntries(queryList);
    return query;
  }

  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const searchKeys = ["title", "category"];
    const sortKeys = ["orderBy"];
    const searchQuery = BoardController.filterByKeys(req.query, searchKeys);
    const sortQuery = BoardController.filterByKeys(req.query, sortKeys);

    const cacheKey = `board:${JSON.stringify(req.query)}`;

    let searchResult = req.query.title
      ? await BoardService.searchByQuery(searchQuery, sortQuery)
      : JSON.parse(await redisCli.get(cacheKey));

    if (!searchResult) {
      searchResult = await BoardService.searchByQuery(searchQuery, sortQuery);
      redisCli.set(cacheKey, JSON.stringify(searchResult));
      redisCli.expire(cacheKey, 120);
    }
    res.status(200).json(searchResult);

    // 캐싱 안하는 실험 코드
    // const searchResult = await BoardService.searchByQuery(searchQuery, sortQuery);
    // res.status(200).json(searchResult);
  }
}

export default BoardController;
