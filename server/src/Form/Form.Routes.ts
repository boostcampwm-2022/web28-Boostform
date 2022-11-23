import express from "express";
import FormController from "./Form.Controller";
import { authMiddleware } from "../Middlewares/Auth.Middleware";

const formRouter = express.Router();

formRouter.use("/", authMiddleware);

formRouter.get("/", FormController.getFormList);

formRouter.get("/:formId", FormController.getForm);

formRouter.post("/", FormController.createNewForm);

formRouter.patch("/:formId", FormController.updateForm);

formRouter.delete("/:formId", FormController.deleteForm);

export default formRouter;
