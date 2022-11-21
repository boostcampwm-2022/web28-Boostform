import { Request, Response, NextFunction } from "express";
import ResponseService from "./Response.Service";

class ResponseController {
  static async checkAnswerExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.userID);
      const { formID } = req.params;

      const responsed = await ResponseService.checkAnswerExistence(formID, userID);

      res.json({ responsed });
    } catch (err) {
      next(err);
    }
  }
}

export default ResponseController;
