import { Request, Response, NextFunction } from "express";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import ResultService from "./Result.Service";

class ResultController {
  resultService: ResultService;

  constructor(resultService: ResultService) {
    this.resultService = resultService;
    this.formResult = this.formResult.bind(this);
  }

  async formResult(req: Request, res: Response, next: NextFunction) {
    const { formId } = req.params;
    if (!formId || typeof formId !== "string") {
      next(new BadRequestException());
      return;
    }

    try {
      await this.resultService.init(formId);
      const result = this.resultService.formResult();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ResultController(new ResultService());
