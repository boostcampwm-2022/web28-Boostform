import express from "express";
import ResponseController from "./Response.Controller";
import authMiddleware from "../Middlewares/Auth.Middleware";

const responseRouter = express.Router();

responseRouter.get("/:formID", authMiddleware, ResponseController.checkAnswerExistence);

export default responseRouter;
