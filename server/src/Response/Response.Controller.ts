import { Request, Response, NextFunction } from "express";
import ResponseService from "./Response.Service";
import FormService from "../Form/Form.Service";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";

class ResponseController {
  static async checkResponseExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.userID);
      const { formID } = req.params;

      const responsed = await ResponseService.checkAnswerExistence(formID, userID);

      res.status(200).json({ responsed });
    } catch (err) {
      next(err);
    }
  }

  static async getFormForResponsePage(req: Request, res: Response, next: NextFunction) {
    try {
      const { formID } = req.params;

      const form = await FormService.getForm(formID);
      const question = FormService.getQuestionForResponse(form.question);

      res.status(200).json({
        title: form.title,
        description: form.description,
        category: form.category,
        question,
        acceptResponse: form.accept_response,
        loginRequired: form.login_required,
      });
    } catch (err) {
      next(err);
    }
  }

  static async saveResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { formID } = req.params;
      const { userID } = req;
      const { answerList } = req.body;

      const responseID = await ResponseService.saveResponse(formID, userID, answerList);

      res.status(201).json({ responseID });
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
      const { formID, responseID } = req.params;
      const response = await ResponseService.getResponse(responseID);

      if (req.userID) {
        res.status(200).json({ userID: req.userID, formID: response.form_id, answerList: response.answer_list });
      } else {
        res.status(200).json({ formID: response.form_id, answerList: response.answer_list });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { responseID } = req.params;
      const { answerList } = req.body;

      await ResponseService.updateResponse(responseID, answerList);

      res.status(200);
    } catch (err) {
      next(err);
    }
  }
}

export default ResponseController;
