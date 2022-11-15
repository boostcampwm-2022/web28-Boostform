import { Response, NextFunction } from "express";
import { CallFormListRequest, CreateNewFormRequest } from "./Form.Interface";
import FormService from "./Form.Service";

function toDateString(date: Date): string {
  const yearString = date.getFullYear();
  const monthString = date.getMonth() + 1 > 10 ? `${date.getMonth() + 1}` : `0${date.getMonth() + 1}`;
  const dateString = date.getDate() > 10 ? `${date.getDate()}` : `0${date.getDate()}`;
  return `${yearString}-${monthString}-${dateString}`;
}

class FormController {
  static sendFormListMockData(req: CallFormListRequest, res: Response, next: NextFunction) {
    const { page } = req.params;
    const num = (index: number) => (page - 1) * 5 + index;
    const str = (index: number) => `${num(index)}`;
    const date = new Date();
    const dateString = toDateString(date);
    const makeFormOnList = (index: number) => {
      return {
        id: `id${str(index)}`,
        title: `제목${str(index)}`,
        acceptResponse: true,
        response: num(index),
        createdAt: dateString,
        updatedAt: dateString,
        onBoard: true,
        category: "개발",
      };
    };
    res.status(200).json({
      form: [makeFormOnList(1), makeFormOnList(2), makeFormOnList(3), makeFormOnList(4), makeFormOnList(5)],
    });
  }

  static createNewForm(req: CreateNewFormRequest, res: Response, next: NextFunction) {
    const formID = FormService.createNewForm(req.body.userID);
    res.status(201).json({
      formID,
    });
  }
}

export default FormController;
