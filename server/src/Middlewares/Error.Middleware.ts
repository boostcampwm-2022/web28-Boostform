import { NextFunction, Request, Response } from "express";
import HttpException from "../Common/Exceptions/Http.Exception";

const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  const { status, message } = err;
  res.status(err.status).send({
    status,
    message,
  });
};

export default errorMiddleware;
