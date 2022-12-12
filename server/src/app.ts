/* eslint-disable no-console */
/* eslint-disable import/no-import-module-exports */
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import cors from "cors";
import "reflect-metadata";

import indexRouter from "./routes/index";
import errorMiddleware from "./Middlewares/Error.Middleware";
import NotFoundException from "./Common/Exceptions/NotFound.Exception";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  })
);
// view engine setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundException());
});
// error handler
app.use(errorMiddleware);

export default app;
