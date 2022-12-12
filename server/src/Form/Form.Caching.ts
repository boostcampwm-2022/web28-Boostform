import { NextFunction, Request, Response } from "express";
import redisCli from "../Loader/Redis.Loader";

const formCaching = async (req: Request, res: Response, next: NextFunction) => {
  const cachingResult = await redisCli.get(`form:${req.params.formId}`);
  if (cachingResult) {
    const form = JSON.parse(cachingResult);
    res.status(200).json(form);

    redisCli.expire(`form:${req.params.formId}`, 300);
  } else {
    next();
  }
};

export default formCaching;
