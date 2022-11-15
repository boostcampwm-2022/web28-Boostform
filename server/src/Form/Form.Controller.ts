import { Response, NextFunction } from "express";
import { CallFormListRequest, CreateNewFormRequest, UpdateFormRequest, DeleteFormRequest } from "./Form.Interface";
import FormService from "./Form.Service";

function toDateString(date: Date): string {
  const yearString = date.getFullYear();
  const monthString = date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const dateString = date.getDate() > 10 ? `${date.getDate()}` : `0${date.getDate()}`;
  return `${yearString}-${monthString}-${dateString}`;
}

class FormController {
  static createNewForm(req: CreateNewFormRequest, res: Response, next: NextFunction) {
    const formID = FormService.createNewForm(req.body.userID);
    res.status(201).json({
      formID,
    });
  }

  static async sendFormList(req: CallFormListRequest, res: Response, next: NextFunction) {
    const { userID, page } = req.params;
    const formList = await FormService.getFormList(userID, page);
    res.json({
      form: formList,
    });
  }

  static async updateForm(req: UpdateFormRequest, res: Response, next: NextFunction) {
    const { params, body } = req;
    const formID = params.id;
    await FormService.updateFormList(formID, body);
    res.json(200);
  }

  static async deleteForm(req: DeleteFormRequest, res: Response, next: NextFunction) {
    const formID = req.params.id;
    await FormService.deleteForm(formID);
    res.json(204);
  }
}

export default FormController;
