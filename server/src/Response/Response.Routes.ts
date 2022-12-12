import express from "express";
import ResponseController from "./Response.Controller";
import { authMiddleware, checkAccessTokenExistence } from "../Middlewares/Auth.Middleware";

const responseRouter = express.Router();

responseRouter.get("/isSubmitted/:formId", authMiddleware, ResponseController.checkResponseExistence);

responseRouter.post("/:formId", checkAccessTokenExistence, ResponseController.saveResponse);

responseRouter.get("/:formId/:responseId", checkAccessTokenExistence, ResponseController.revisitResponse);

responseRouter.patch("/:formId/:responseId", ResponseController.updateResponse);

export default responseRouter;
