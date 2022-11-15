import express from "express";
import FormController from "./Form.Controller.Mock";

const formRouter = express.Router();

formRouter.get("/:page", FormController.sendFormListMockData);

export default formRouter;
