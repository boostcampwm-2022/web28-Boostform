import { Request, Response, NextFunction } from "express";
import BoardService from "./Board.Service";

interface FormSearchQueryObject {
  title?: string;
  category?: string;
}

class BoardController {
  static async getFormList(req: Request, res: Response, next: NextFunction) {
    const searchQueries = ["title", "category", "order", "order_by"];
    const formSearchQueryList = Object.entries(req.query).filter(([k, v]) => searchQueries.includes(k));
    const formSearchQueryObject = Object.fromEntries(formSearchQueryList);

    const searchResult = await BoardService.searchByQuery(formSearchQueryObject);
    res.send(searchResult);
  }
}

export default BoardController;
