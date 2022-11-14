/* eslint-disable import/no-import-module-exports */
import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import mysql from "mysql";
import mongoose from "mongoose";
import cors from "cors";

import indexRouter from "./routes/index";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: `http://localhost:3000`,
    credentials: true,
  })
);

// MySQL 연결
export const RDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DATABASE,
});
RDB.connect();

// MongoDB 연결
function connectDB() {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@cluster0.a7vmgdw.mongodb.net/database0?`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("mongoDB is connected...");
      }
    }
  );
}

connectDB();

// view engine setup

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../client/build")));

app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(process.env.PORT);

export default app;
