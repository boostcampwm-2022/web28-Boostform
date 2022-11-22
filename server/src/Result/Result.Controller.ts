import { Request, Response, NextFunction } from "express";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import ResultService from "./Result.Service";

class ResultController {
  form: 
  static async formResult(req: Request, res: Response, next: NextFunction) {
    const { formID } = req.params;
    if (!formID || typeof formID !== "string") {
      next(new BadRequestException());
      return;
    }
    ResultService.result(formID)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default ResultController;
