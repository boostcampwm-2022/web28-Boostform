import express from "express";
import resultController from "./Result.Controller";

const router = express.Router();

router.get("/:formId", resultController.formResult);

export default router;
