import express from "express";
import ResponseController from "./Response.Controller";
import { authMiddleware, checkAccessTokenExistence } from "../Middlewares/Auth.Middleware";

const responseRouter = express.Router();

responseRouter.get("/:formID", authMiddleware, ResponseController.checkResponseExistence);

responseRouter.get("/:formID/response-page", ResponseController.getFormForResponsePage);

responseRouter.post("/:formID", checkAccessTokenExistence, ResponseController.saveResponse);

responseRouter.get("/:formID/:responseID", checkAccessTokenExistence, ResponseController.revisitResponse);

responseRouter.patch("/:formID/:responseID", ResponseController.updateResponse);

export default responseRouter;
