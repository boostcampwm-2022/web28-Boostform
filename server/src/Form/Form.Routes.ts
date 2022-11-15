import express from "express";
import FormController from "./Form.Controller";

const formRouter = express.Router();

formRouter.get("/:page", FormController.sendFormListMockData);

formRouter.post("/", FormController.createNewForm);

export default formRouter;
