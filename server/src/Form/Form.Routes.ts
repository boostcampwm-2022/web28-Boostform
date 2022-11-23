import express from "express";
import FormController from "./Form.Controller";
import { authMiddleware } from "../Middlewares/Auth.Middleware";

const formRouter = express.Router();

formRouter.use("/", authMiddleware);

formRouter.get("/", FormController.getFormList);

formRouter.get("/:id", FormController.getForm);

formRouter.post("/", FormController.createNewForm);

formRouter.patch("/:id", FormController.updateForm);

formRouter.delete("/:id", FormController.deleteForm);

export default formRouter;
