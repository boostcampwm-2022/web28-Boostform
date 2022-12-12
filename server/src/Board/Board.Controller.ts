import { Request, Response, NextFunction } from "express";
import redisCli from "../Loader/Redis.Loader";

import BoardService from "./Board.Service";
import { searchKeyList, sortKeyList } from "./Board.Constants";
import { filterByObjectKeys } from "./Board.Utils";

class BoardController {
  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const searchQuery = filterByObjectKeys(req.query, searchKeyList);
    const sortQuery = filterByObjectKeys(req.query, sortKeyList);
    const pageNum = req.query.page ? Number(req.query.page) : 1;

    const cacheKey = `board:${JSON.stringify(searchQuery)},${JSON.stringify(sortQuery)}`;
    const pageCacheKey = `${cacheKey},{page:${pageNum}}`;
    const countCacheKey = `${cacheKey},{count}`;

    let searchResult = JSON.parse(await redisCli.get(pageCacheKey));
    if (!searchResult) {
      searchResult = await BoardService.searchByQuery(searchQuery, sortQuery, pageNum);
      if (!req.query.title) {
        redisCli.set(pageCacheKey, JSON.stringify(searchResult));
        redisCli.expire(pageCacheKey, 120);
      }
    }

    let lastPage = JSON.parse(await redisCli.get(countCacheKey));
    if (!lastPage) {
      lastPage = await BoardService.countByQuery(searchQuery);
      redisCli.set(countCacheKey, JSON.stringify(lastPage));
      redisCli.expire(countCacheKey, 600);
    }

    res.status(200).send({ form: searchResult, lastPage });
  }
}

export default BoardController;
