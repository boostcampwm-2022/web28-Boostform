import { Request, Response, NextFunction } from "express";
import { redisCli } from "../app";

import BoardService from "./Board.Service";
import { searchKeyList, sortKeyList } from "./Board.Constants";
import { filterByObjectKeys } from "./Board.Utils";

class BoardController {
  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const cacheKey = `board:${JSON.stringify(req.query)}`;
    const searchQuery = filterByObjectKeys(req.query, searchKeyList);
    const sortQuery = filterByObjectKeys(req.query, sortKeyList);
    const pageNum = req.query.page ? Number(req.query.page) : 1;

    let searchResult = JSON.parse(await redisCli.get(cacheKey));
    if (!searchResult) {
      searchResult = await BoardService.searchByQuery(searchQuery, sortQuery, pageNum);
      if (!req.query.title) {
        redisCli.set(cacheKey, JSON.stringify(searchResult));
        redisCli.expire(cacheKey, 120);
      }
    }

    const lastPage = await BoardService.countByQuery(searchQuery);

    res.status(200).send({ form: searchResult, lastPage });
  }
}

export default BoardController;
