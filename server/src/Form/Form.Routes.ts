import express from "express";
import FormController from "./Form.Controller";

const formRouter = express.Router();

formRouter.get("/:userID/:page", FormController.sendFormList);

formRouter.post("/", FormController.createNewForm);

formRouter.patch("/:id", FormController.updateForm);

formRouter.delete("/:id", FormController.deleteForm);

export default formRouter;
