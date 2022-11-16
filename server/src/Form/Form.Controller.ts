import { Response, NextFunction } from "express";
import { CallFormListRequest, CreateNewFormRequest, UpdateFormRequest, DeleteFormRequest } from "./Form.Interface";
import FormService from "./Form.Service";

class FormController {
  static createNewForm(req: CreateNewFormRequest, res: Response, next: NextFunction) {
    try {
      const formID = FormService.createNewForm(req.body.userID);
      res.status(201).json({
        formID,
      });
    } catch (err) {
      next(err);
    }
  }

  static async sendFormList(req: CallFormListRequest, res: Response, next: NextFunction) {
    try {
      const { userID, page } = req.params;
      const formList = await FormService.getFormList(userID, page);
      res.json({
        form: formList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateForm(req: UpdateFormRequest, res: Response, next: NextFunction) {
    try {
      const { params, body } = req;
      const formID = params.id;
      await FormService.updateFormList(formID, body);
      res.json(200);
    } catch (err) {
      next(err);
    }
  }

  static async deleteForm(req: DeleteFormRequest, res: Response, next: NextFunction) {
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
