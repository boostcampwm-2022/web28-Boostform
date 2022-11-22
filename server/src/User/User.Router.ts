import express from "express";
import userController from "./User.Controller";
import { authMiddleware } from "../Middlewares/Auth.Middleware";

const router = express.Router();

router.get("/redirect", userController.redirect);

router.get("/login", userController.login);

router.get("/", authMiddleware, userController.userInfo);

router.delete("/logout", authMiddleware, userController.logout);

export default router;
