import express from "express";
import FormController from "./Form.Controller";

const formRouter = express.Router();

formRouter.get("/:userID/:page", FormController.sendFormList);

formRouter.post("/", FormController.createNewForm);

export default formRouter;
