/* eslint-disable no-console */
/* eslint-disable import/no-import-module-exports */
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import "reflect-metadata";
import { DataSource } from "typeorm";

import indexRouter from "./routes/index";
import errorMiddleware from "./Middlewares/Error.Middleware";
import NotFoundException from "./Common/Exceptions/NotFound.Exception";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  })
);

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.TYPEORM_HOST || "",
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME || "",
  password: process.env.TYPEORM_PASSWORD || "",
  database: process.env.TYPEORM_DATABASE || "",
  entities: [`${__dirname}/**/*.Model{.ts,.js}`],
});

myDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
});

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
  next(new NotFoundException());
});
// error handler
app.use(errorMiddleware);

app.listen(process.env.PORT);

export default app;
