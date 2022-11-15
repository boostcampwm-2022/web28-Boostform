import express from "express";
import userController from "./User.Controller";

const router = express.Router();

router.get("/redirect", userController.redirect);

// router.get("/login", userController.login);

export default router;
