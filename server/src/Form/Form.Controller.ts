import { Request, Response, NextFunction } from "express";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import UnauthorizedException from "../Common/Exceptions/Unauthorized.Exception";
import FormService from "./Form.Service";
import redisCli from "../Loader/Redis.Loader";

class FormController {
  static async createNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.userID) {
        throw new UnauthorizedException("로그인 후 설문지를 생성할 수 있습니다.");
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
      const { cursor } = req.query;
      if (typeof cursor !== "string") {
        throw new BadRequestException("cursor가 없습니다.");
      }
      const { userID } = req;
      if (!userID) {
        throw new BadRequestException("로그인 후 설문지 리스트를 받을 수 있습니다.");
      }

      const [formList, lastId] = await FormService.getFormList(userID, cursor);

      res.status(200).json({
        form: formList,
        lastId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { formId } = req.params;
      const form = await FormService.getForm(formId);

      res.status(200).json(form);
      redisCli.set(`form:${formId}`, JSON.stringify(form), { EX: 300 });
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

      const form = await FormService.getForm(formId);
      redisCli.set(`form:${formId}`, JSON.stringify(form), { EX: 300 });
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
