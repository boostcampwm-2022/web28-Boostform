import { Request, Response, NextFunction } from "express";
import ResponseService from "./Response.Service";
import FormService from "../Form/Form.Service";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";

class ResponseController {
  static async checkResponseExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.userID);
      const { formId } = req.params;

      const responseId = await ResponseService.checkAnswerExistence(formId, userID);

      res.status(200).json({ responseId });
    } catch (err) {
      next(err);
    }
  }

  static async saveResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      const { userID } = req;
      const answerListFromRequest = req.body.answerList;

      const answerList = ResponseService.getAnswerListForDB(answerListFromRequest);
      const responseId = await ResponseService.saveResponse(formId, userID, answerList);

      res.status(201).json({ responseId });
    } catch (err: any) {
      if (err.message.includes("Response validation failed")) {
        next(new BadRequestException("응답 제출 형식이 잘못되었습니다."));
      } else {
        next(err);
      }
    }
  }

  static async revisitResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId, responseId } = req.params;
      const response = await ResponseService.getResponse(responseId);

      if (req.userID) {
        res.status(200).json({ userID: req.userID, formId, answerList: response.answerList });
      } else {
        res.status(200).json({ formId, answerList: response.answerList });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { responseId } = req.params;
      const answerListFromRequest = req.body.answerList;

      const answerList = ResponseService.getAnswerListForDB(answerListFromRequest);
      await ResponseService.updateResponse(responseId, answerList);

      res.status(200).json({ responseId });
    } catch (err) {
      next(err);
    }
  }
}

export default ResponseController;
