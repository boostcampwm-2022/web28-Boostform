import express from "express";
import ResultController from "./Result.Controller";

const router = express.Router();

router.get("/:formID", ResultController.formResult);

export default router;
