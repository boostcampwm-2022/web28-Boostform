import { Request, Response, NextFunction } from "express";
import InteranServerException from "../Common/Exceptions/InternalServer.Exception";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import FormService from "./Form.Service";
import { FormInDB } from "./Form.Interface";

class FormController {
  static async createNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userID) {
        throw new InteranServerException();
      }
      const formId = await FormService.createNewForm(req.userID);
      res.status(201).json({
        formId,
      });
    } catch (err: any) {
      if (err.message.includes("Form validation failed")) {
        next(new BadRequestException("설문지 제출 형식이 잘못되었습니다."));
      } else {
        console.log(err);

        next(err);
      }
    }
  }

  static async getFormList(req: Request, res: Response, next: NextFunction) {
    try {
      const size = Number(req.query.size);
      const userID = Number(req.userID);
      const formList = await FormService.getFormList(userID, size);
      res.status(200).json({
        form: formList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      const form = (await FormService.getForm(formId)) as FormInDB;

      res.status(200).json(form);
    } catch (err) {
      console.log(err);

      next(err);
    }
  }

  static async updateForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { params, body } = req;
      const { formId } = params;

      await FormService.updateForm(formId, body);
      res.status(200).end();
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      await FormService.deleteForm(formId);
      res.status(204).end();
    } catch (err) {
      console.log(err);

      next(err);
    }
  }
}

export default FormController;
