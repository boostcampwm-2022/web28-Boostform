import { Request, Response, NextFunction } from "express";
import InteranServerException from "../Common/Exceptions/InternalServer.Exception";
import FormService from "./Form.Service";

class FormController {
  static createNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userID) {
        throw new InteranServerException();
      }
      const formID = FormService.createNewForm(req.userID);
      res.status(201).json({
        formID,
      });
    } catch (err) {
      next(err);
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
      await FormService.updateFormList(formID, body);
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
