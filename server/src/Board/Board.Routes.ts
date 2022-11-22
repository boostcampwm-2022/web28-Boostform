import express from "express";
import BoardController from "./Board.Controller";

const boardRouter = express.Router();

boardRouter.get("/", BoardController.getFormList);

export default boardRouter;
