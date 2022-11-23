import express from "express";
import resultController from "./Result.Controller";

const router = express.Router();

router.get("/:formID", resultController.formResult);
export default router;
