import { Request, Response, NextFunction } from "express";
import InteranServerException from "../Common/Exceptions/InternalServer.Exception";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import FormService from "./Form.Service";

class FormController {
  static async createNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userID) {
        throw new InteranServerException();
      }
      const formID = await FormService.createNewForm(req.userID);
      res.status(201).json({
        formID,
      });
    } catch (err: any) {
      if (err.message.includes("Form validation failed")) {
        next(new BadRequestException("설문지 제출 형식이 잘못되었습니다."));
      } else {
        next(err);
      }
    }
  }

  static async sendFormList(req: Request, res: Response, next: NextFunction) {
    try {
      const size = Number(req.params.size);
      const userID = Number(req.userID);
      const formList = await FormService.getFormList(userID, size);
      res.json({
        form: formList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { params, body } = req;
      const formID = params.id;
      await FormService.updateForm(formID, body);
      res.json(200);
    } catch (err) {
      next(err);
    }
  }

  static async deleteForm(req: Request, res: Response, next: NextFunction) {
    try {
      const formID = req.params.id;
      await FormService.deleteForm(formID);
      res.json(204);
    } catch (err) {
      next(err);
    }
  }
}

export default FormController;
