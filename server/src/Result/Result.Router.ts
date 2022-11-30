import express, { Response, Request } from "express";
import resultController from "./Result.Controller";

import { redisCli } from "../app";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  redisCli.set("key", "123");
});

router.get("/:formId", resultController.formResult);

export default router;
