import { NextFunction, Request, Response } from "express";
import HttpException from "../Common/Exceptions/Http.Exception";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
  // render the error page
  if (!err.status) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  const { status, message } = err;
  res.status(err.status).send({
    status,
    message,
  });
};

export default errorMiddleware;
