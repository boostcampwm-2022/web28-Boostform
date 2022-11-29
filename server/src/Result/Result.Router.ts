import express, { Response, Request } from "express";
import resultController from "./Result.Controller";

import { redisCli } from "../app";

const router = express.Router();

router.get("/:formId", resultController.formResult);

router.get("/test", async (req: Request, res: Response) => {
  redisCli.set("key", "123");
});
export default router;
